import Scheduler from "./scheduler.js";


const CompositionDescriptor = (_composition, _progressions, _samples) => {
  const composition = _composition;
  const progressions = _progressions;
  const samples = _samples;
  return {
    getComposition: () => composition,
    getProgressions: () => progressions,
    getSamples: () => samples
  }
};

const Alternator = (_audioContext, _compositionDescriptors,
                    _alternateCallback = (_schedulerIndex) => {}, _stopCallback = (_schedulerIndex) => {}) => {

  const audioContext = _audioContext;
  const compositionDescriptors = _compositionDescriptors;
  const alternateCallback = typeof _alternateCallback === 'function' ? _alternateCallback : (_schedulerIndex) => {};
  const stopCallback = typeof _stopCallback === 'function' ? _stopCallback : (_schedulerIndex) => {};

  const schedulers = compositionDescriptors.map((compositionDescriptor) =>
    Scheduler(
      compositionDescriptor.getComposition(),
      compositionDescriptor.getProgressions(),
      compositionDescriptor.getSamples(),
      audioContext
    )
  );

  let running = false;
  let schedulerIndex = schedulers.length - 1;
  let currScheduler = {
    stop: () => {},
    stopAfterLastScheduled : () => {}
  };

  const alternate = () => {
    schedulerIndex++;
    schedulerIndex = schedulerIndex % schedulers.length;
    currScheduler = schedulers[schedulerIndex];

    currScheduler.start(() => {
      alternate();
    });
    alternateCallback(schedulerIndex);
  };

  return {
    isRunning: () => running,
    start: () => {
      if (running === false) {
        running = true;
        alternate();
      }
      else {
        console.warn(`alternator illegal state - running=${running}`);
      }
    },
    next: () => {
      currScheduler.stopAfterLastScheduled(true, () => {
        alternate();
      });
    },
    stop: () => {
      if (running === true) {
        running = false;
        currScheduler.stop(true);
        stopCallback(schedulerIndex);
        schedulerIndex = schedulers.length - 1;
      }
      else {
        console.warn(`alternator illegal state - running=${running}`);
      }
    },
    stopAfterLastScheduled: () => {
      if (running === true) {
        currScheduler.stopAfterLastScheduled(true, () => {
          running = false;
          stopCallback(schedulerIndex);
        });
      }
      else {
        console.warn(`alternator illegal state - running=${running}`);
      }
    }
  }
};

Alternator.CompositionDescriptor = CompositionDescriptor;


export default Alternator;
