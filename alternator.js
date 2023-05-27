const Alternator = (_schedulers,
                    _alternateCallback = (_schedulerIndex, _schedulersLength) => {},
                    _stopCallback = (_schedulerIndex, _schedulersLength) => {}) => {
  const schedulers = [..._schedulers];
  const alternateCallback = typeof _alternateCallback === 'function' ? _alternateCallback : (_schedulerIndex, _schedulersLength) => {};
  const stopCallback = typeof _stopCallback === 'function' ? _stopCallback : (_schedulerIndex, _schedulersLength) => {};

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
    alternateCallback(schedulerIndex, schedulers.length);
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
        stopCallback(schedulerIndex, schedulers.length);
      }
      else {
        console.warn(`alternator illegal state - running=${running}`);
      }
    },
    stopAfterLastScheduled: () => {
      if (running === true) {
        currScheduler.stopAfterLastScheduled(true, () => {
          running = false;
          stopCallback(schedulerIndex, schedulers.length);
        });
      }
      else {
        console.warn(`alternator illegal state - running=${running}`);
      }
    },
    get schedulersLength(){return schedulers.length;}
  };
};


export default Alternator;
