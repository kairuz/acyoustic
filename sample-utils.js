const downloadBuffer = (audioContext, url) => {
  console.log(`downloadBuffer(audioContext=${audioContext}, url=${url}`);
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(bufferRes => {
        if (bufferRes.ok) {
          bufferRes.arrayBuffer()
            .then((arrayBuffer) => {
              audioContext.decodeAudioData(arrayBuffer)
                .then(resolve)
                .catch((error) => reject(`error ${error} decoding file ${url}`));
            });
        } else {
          const error = new Error('Not 2xx response');
          error.response = bufferRes;
          reject(`error ${error} requesting sample ${url}`);
        }
      });
  });
};

const defaultSamplePathToUrlCallback = (samplePath) => samplePath;

const loadSampleBuffers = (audioContext, samples, _samplePathToUrlCallback = defaultSamplePathToUrlCallback) => {
  const samplePathToUrlCallback = typeof _samplePathToUrlCallback === 'function' ? _samplePathToUrlCallback : defaultSamplePathToUrlCallback;
  return Promise.all(Object.entries(samples).map((entry) => new Promise((resolve) => {
    const sampleName = entry[0];
    const sample = entry[1];
    if (sample.buffer) {
      sample.source = 'state';
      resolve();
    }
    else {
      const sampleUrl = samplePathToUrlCallback(sample.path);
      downloadBuffer(audioContext, sampleUrl)
        .catch((error) => console.error('sample download error ' + sampleName, error))
        .then((audioBuffer) => {
          if (audioBuffer) {
            sample.buffer = audioBuffer;
            sample.source = 'download';
          }
        })
        .then(resolve);
    }
  })));
};

const newSampleNode = (audioBuffer, audioContext, gain = null) => {
  const sampleNode = new AudioBufferSourceNode(audioContext, {buffer: audioBuffer});
  if (gain !== null && typeof gain === 'number' &&
      gain <= 3 && gain > 0) {
    const gainNode = new GainNode(audioContext, {gain: gain});
    sampleNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
  }
  else {
    sampleNode.connect(audioContext.destination);
  }

  return sampleNode;
};


export {
  downloadBuffer,
  loadSampleBuffers,
  newSampleNode
};
