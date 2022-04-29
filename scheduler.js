import {newSampleNode} from "./sample-utils.js";


const Scheduler = (
  _composition, _progressions, _samples, _audioContext,
  _progressionScheduledCallback = (progressionIndex, progression, scheduleTime, progressionDuration, timeToProgressionStart, timeToProgressionEnd) => {},
  _progressionStartCallback = (progressionIndex, progression, scheduleTime, progressionDuration) => {},
  _progressionEndCallback = (progressionIndex, progression, scheduleTime, progressionDuration) => {},
  _schedulerStopCallback = () => {}
) => {
  const composition = _composition;
  const progressions = _progressions;
  const samples = _samples;
  const audioContext = _audioContext;
  const progressionScheduledCallback = typeof _progressionScheduledCallback === 'function' ? _progressionScheduledCallback : (progressionIndex, progression, scheduleTime, progressionDuration, timeToProgressionStart, timeToProgressionEnd) => {};
  const progressionStartCallback = typeof _progressionStartCallback === 'function' ? _progressionStartCallback : (progressionIndex, progression, scheduleTime, progressionDuration) => {};
  const progressionEndCallback = typeof _progressionEndCallback === 'function' ? _progressionEndCallback : (progressionIndex, progression, scheduleTime, progressionDuration) => {};
  const schedulerStopCallback = typeof _schedulerStopCallback === 'function' ? _schedulerStopCallback : () => {};

  let schedulerStartStopCallback = null;
  let schedulerStopAfterLastScheduledCallback = null;
  let stopping = false;
  let running = false;
  let currProgressionIndex = null;
  let lastScheduledTime = null;
  let playingSamplesIdGen = 0;
  const playingSamples = new Map();

  const hasMoreProgressions = () => currProgressionIndex  < (composition.length - 1);

  let stopTimeoutId = null;
  const cancelableTimeoutIds = new Set();

  const scheduleProgression = () => {
    const currentTime = audioContext.currentTime;

    const lastProgressionAndDuration = currProgressionIndex === -1 ? null : composition[currProgressionIndex];
    const lastProgressionDuration = lastProgressionAndDuration === null ? 0 : lastProgressionAndDuration[1];

    currProgressionIndex++;
    const progressionAndDuration = composition[currProgressionIndex];
    const progressionIndex = currProgressionIndex;

    const progressionName = progressionAndDuration[0];
    const progressionDuration = progressionAndDuration[1];
    const progression = progressions[progressionName];
    const scheduleTime = lastScheduledTime === null ? currentTime : lastScheduledTime + lastProgressionDuration;

    Object.entries(progression).forEach((progressionEntry) => {
      const sampleName = progressionEntry[0];
      const sample = samples[sampleName];
      const sampleTimes = progressionEntry[1];

      sampleTimes.forEach((sampleTime) => {
        const playingSample = newSampleNode(sample.buffer, audioContext, sample.gain);
        playingSample.start(scheduleTime + sampleTime);
        const playingSamplesId = playingSamplesIdGen++;
        playingSamples.set(playingSamplesId, playingSample);
        playingSample.addEventListener('ended', () => {
          playingSamples.delete(playingSamplesId);
        });
      });
    });

    const timeToProgressionStart = (lastScheduledTime !== null ? (lastScheduledTime - currentTime) : 0) + lastProgressionDuration;
    const timeToProgressionEnd = timeToProgressionStart + progressionDuration;

    lastScheduledTime = scheduleTime;

    progressionScheduledCallback(progressionIndex, progression, scheduleTime, progressionDuration, timeToProgressionStart, timeToProgressionEnd);

    const progressionStartCallbackTimeoutId = setTimeout(() => {
      cancelableTimeoutIds.delete(progressionStartCallbackTimeoutId);
      progressionStartCallback(progressionIndex, progression, scheduleTime, progressionDuration);
    }, timeToProgressionStart * 1000);
    cancelableTimeoutIds.add(progressionStartCallbackTimeoutId);

    const progressionEndCallbackTimeoutId = setTimeout(() => {
      cancelableTimeoutIds.delete(progressionEndCallbackTimeoutId);
      progressionEndCallback(progressionIndex, progression, scheduleTime, progressionDuration);
    }, timeToProgressionEnd * 1000);
    cancelableTimeoutIds.add(progressionEndCallbackTimeoutId);
  };

  const stop = (cancelStartStopCallback = false) => {
    if (running === false) {
      console.warn('illegal state - running=' + running);
    }
    if (stopping === true) {
      console.warn('illegal state - stopping=' + stopping);
    }

    if (stopTimeoutId !== null) {
      clearTimeout(stopTimeoutId);
      stopping = false;
      stopTimeoutId = null;
    }
    lastScheduledTime = null;
    running = false;
    playingSamples.forEach((playingSample) => playingSample.stop());
    playingSamples.clear();

    cancelableTimeoutIds.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    cancelableTimeoutIds.clear();
    schedulerStopCallback();
    if (cancelStartStopCallback === false) {
      if (schedulerStartStopCallback !== null && typeof schedulerStartStopCallback === 'function') {
        schedulerStartStopCallback();
      }
    }
    schedulerStartStopCallback = null;
  };

  const stopAfterLastScheduled = (cancelStartStopCallback = false, _schedulerStopAfterLastScheduledCallback = null) => {
    if (running === false) {
      console.warn('illegal state - running=' + running);
    }
    if (stopping === true) {
      console.warn('illegal state - stopping=' + stopping);
    }

    if (running === true && stopping === false) {
      schedulerStopAfterLastScheduledCallback = _schedulerStopAfterLastScheduledCallback;
      const currProgressionDuration = composition[currProgressionIndex][1];
      stopping = true;
      const millisToStop = (lastScheduledTime + currProgressionDuration - audioContext.currentTime) * 1000;

      stopTimeoutId = setTimeout(() => {
        stopping = false;
        stop(cancelStartStopCallback);
        if (schedulerStopAfterLastScheduledCallback !== null && typeof schedulerStopAfterLastScheduledCallback === 'function') {
          schedulerStopAfterLastScheduledCallback();
        }
        schedulerStopAfterLastScheduledCallback = null;
      }, millisToStop);
    }
  };

  const checkSchedule = () => {
    if (running === false) {
      return;
    }

    const currProgressionDuration = composition[currProgressionIndex][1];

    if (hasMoreProgressions()) {
      const timeToScheduleNext = lastScheduledTime === null ? audioContext.currentTime : lastScheduledTime + currProgressionDuration;
      const isTimeToScheduleNext = (timeToScheduleNext - audioContext.currentTime) < currProgressionDuration;
      if (isTimeToScheduleNext === true) {
        scheduleProgression();
      }
    }
    else if (stopping === false) {
      stopping = true;
      const millisToStop = (lastScheduledTime + currProgressionDuration - audioContext.currentTime) * 1000;

      stopTimeoutId = setTimeout(() => {
        stopping = false;
        stop(false);
      }, millisToStop);
    }
  };

  const checkScheduleLoop = () => {
    checkSchedule();
    if (running === true && stopping === false) {
      const currProgressionDuration = composition[currProgressionIndex][1];

      setTimeout(checkScheduleLoop, (currProgressionDuration / 3) * 1000); // todo
    }
  };

  const start = (_schedulerStartStopCallback = null) => {
    if (running === true || stopping === true) {
      console.warn(`illegal state - running=${running}, stopping=${stopping} - aborting start`);
      return;
    }
    schedulerStartStopCallback = _schedulerStartStopCallback;
    stopTimeoutId = null;
    cancelableTimeoutIds.clear();
    currProgressionIndex = -1;
    lastScheduledTime = null;

    scheduleProgression();
    running = true;
    setTimeout(checkScheduleLoop, 0);
  };

  return {
    start,
    stop,
    stopAfterLastScheduled,
    isRunning: () => running === true,
    isStopping: () => stopping === true,
    isStopped: () => running === false && stopping === false,
  };
};


export default Scheduler;
