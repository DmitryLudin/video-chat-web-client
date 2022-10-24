export const videoMediaConstraints = {
  audio: false,
  video: {
    width: {
      min: 640,
      ideal: 1920,
    },
    height: {
      min: 400,
      ideal: 1080,
    },
    frameRate: { ideal: 10, max: 15 },
  },
};

export const videoEncodings = [
  {
    rid: 'r0',
    maxBitrate: 100000,
    //scaleResolutionDownBy: 10.0,
    scalabilityMode: 'S1T3',
  },
  {
    rid: 'r1',
    maxBitrate: 300000,
    scalabilityMode: 'S1T3',
  },
  {
    rid: 'r2',
    maxBitrate: 900000,
    scalabilityMode: 'S1T3',
  },
];

export const videoCodecOptions = {
  videoGoogleStartBitrate: 1000,
};

export const audioMediaConstraints = {
  video: false,
  audio: true,
};
