const STANDARD_BEAT_NOTE  = 1/4; // quarter note beats assumed for bpm measurement

const BEATS_PER_MINUTE    = 100; // 1 quarter note = 1 beat; 100 quarter notes (200 eighth notes) per minute
const NOTES_PER_BAR       = 11;
const NOTE_TYPE           = 1/8; // song is in 11/8 time (eleven eighth notes per bar)
const BEATS_PER_NOTE      = STANDARD_BEAT_NOTE / NOTE_TYPE;
const BEATS_PER_BAR       = NOTES_PER_BAR * BEATS_PER_NOTE;
const BEAT_LENGTH_MILLIS  = (60000 / BEATS_PER_MINUTE) * (NOTE_TYPE / STANDARD_BEAT_NOTE);
const NOTE_LENGTH_MILLIS  = BEAT_LENGTH_MILLIS * BEATS_PER_NOTE;
const BAR_LENGTH_MILLIS   = NOTE_LENGTH_MILLIS * NOTES_PER_BAR;
const BAR_LENGTH_SECS     = (NOTE_LENGTH_MILLIS * NOTES_PER_BAR) / 1000;

// 1      &      2      &      3      &      4      &      5      &      6      &      7      &      8      &      9      &      10     &      11     &
const RHYTHM_DRUMS_KICK =
  [0,                                 2.5,                                      5.5,                               8                                         ];
const RHYTHM_DRUMS_SNARE =
  [                            2,                                 4.5,                                      7.5,                               10            ];
const RHYTHM_DRUMS_HIHAT =
  [0,            1,            2,            3,            4,            5,            6,            7,            8,             9,           10            ];
const RHYTHM_DRUMS_HIHAT_ACCENTED =
  [0,            1,            2,            3,            4,                          6,            7,            8,             9,           10            ];
const RHYTHM_DRUMS_CRASH =
  [0                                                                                                                                                         ];
const RHYTHM_DRUMS_HIHAT_OPEN =
  [                                                                             5.5                                                                          ];
const RHYTHM_DRUMS_HIHAT_OPEN_ACCENTED =
  [                                                                      5                                                                                   ];

const TIMING_DRUMS_KICK                 = RHYTHM_DRUMS_KICK.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);
const TIMING_DRUMS_SNARE                = RHYTHM_DRUMS_SNARE.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);
const TIMING_DRUMS_HIHAT                = RHYTHM_DRUMS_HIHAT.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);
const TIMING_DRUMS_HIHAT_ACCENTED       = RHYTHM_DRUMS_HIHAT_ACCENTED.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);
const TIMING_DRUMS_CRASH                = RHYTHM_DRUMS_CRASH.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);
const TIMING_DRUMS_HIHAT_OPEN           = RHYTHM_DRUMS_HIHAT_OPEN.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);
const TIMING_DRUMS_HIHAT_OPEN_ACCENTED  = RHYTHM_DRUMS_HIHAT_OPEN_ACCENTED.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);

const SAMPLE_DRUMS_CRASH      = "crash";
const SAMPLE_DRUMS_HIHAT      = "hihat";
const SAMPLE_DRUMS_HIHAT_OPEN = "hihat (open)";
const SAMPLE_DRUMS_SNARE      = "snare";
const SAMPLE_DRUMS_KICK       = "kick";
const SAMPLE_GUITAR_ALPHA     = "guitar (alpha)";
const SAMPLE_GUITAR_BETA      = "guitar (beta)";
const SAMPLE_GUITAR_GAMMA     = "guitar (gamma)";
const SAMPLE_GUITAR_DELTA     = "guitar (delta)";

const PROGRESSION_DRUMS           = "drums";
const PROGRESSION_ALPHA           = "alpha";
const PROGRESSION_BETA            = "beta";
const PROGRESSION_GAMMA           = "gamma";
const PROGRESSION_GAMMA_ACCENTED  = "gamma (acc.)";
const PROGRESSION_DELTA           = "delta";
const PROGRESSION_DELTA_ACCENTED  = "delta (acc.)";


export default {
  "samples": {
    [SAMPLE_DRUMS_CRASH]: {
      "path": "https://kairuz.github.io/assets/audio/samples/drums-crash.ogg"
    },
    [SAMPLE_DRUMS_HIHAT]: {
      "path": "https://kairuz.github.io/assets/audio/samples/drums-hihat.ogg"
    },
    [SAMPLE_DRUMS_HIHAT_OPEN]: {
      "path": "https://kairuz.github.io/assets/audio/samples/drums-hihat-open.ogg"
    },
    [SAMPLE_DRUMS_SNARE]: {
      "path": "https://kairuz.github.io/assets/audio/samples/drums-snare.ogg"
    },
    [SAMPLE_DRUMS_KICK]: {
      "path": "https://kairuz.github.io/assets/audio/samples/drums-kick.ogg"
    },
    [SAMPLE_GUITAR_ALPHA]: {
      "path": "https://kairuz.github.io/assets/audio/samples/gymno/guitar-alpha.ogg"
    },
    [SAMPLE_GUITAR_BETA]: {
      "path": "https://kairuz.github.io/assets/audio/samples/gymno/guitar-beta.ogg"
    },
    [SAMPLE_GUITAR_GAMMA]: {
      "path": "https://kairuz.github.io/assets/audio/samples/gymno/guitar-gamma.ogg"
    },
    [SAMPLE_GUITAR_DELTA]: {
      "path": "https://kairuz.github.io/assets/audio/samples/gymno/guitar-delta.ogg"
    }
  },
  "progressions": {
    [PROGRESSION_DRUMS]: {
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_ALPHA]: {
      [SAMPLE_GUITAR_ALPHA]     : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_BETA]: {
      [SAMPLE_GUITAR_BETA]      : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_GAMMA]: {
      [SAMPLE_GUITAR_GAMMA]     : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_GAMMA_ACCENTED]: {
      [SAMPLE_GUITAR_GAMMA]     : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT_ACCENTED,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN_ACCENTED,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_DELTA]: {
      [SAMPLE_GUITAR_DELTA]     : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_DELTA_ACCENTED]: {
      [SAMPLE_GUITAR_DELTA]     : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT_ACCENTED,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN_ACCENTED,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    }
  },
  "compositions": {
    "general": [
      [PROGRESSION_BETA,            BAR_LENGTH_SECS],
      [PROGRESSION_GAMMA,           BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA,           BAR_LENGTH_SECS],
      [PROGRESSION_BETA,            BAR_LENGTH_SECS],
      [PROGRESSION_GAMMA_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_DELTA,           BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA,           BAR_LENGTH_SECS],
      [PROGRESSION_BETA,            BAR_LENGTH_SECS],
      [PROGRESSION_GAMMA,           BAR_LENGTH_SECS],
      [PROGRESSION_DELTA_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA,           BAR_LENGTH_SECS]
    ],
    "long": [
      [PROGRESSION_BETA,            BAR_LENGTH_SECS],
      [PROGRESSION_BETA,            BAR_LENGTH_SECS],
      [PROGRESSION_GAMMA,           BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA,           BAR_LENGTH_SECS],
      [PROGRESSION_BETA,            BAR_LENGTH_SECS],
      [PROGRESSION_GAMMA_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_DELTA,           BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA,           BAR_LENGTH_SECS],
      [PROGRESSION_BETA,            BAR_LENGTH_SECS],
      [PROGRESSION_GAMMA,           BAR_LENGTH_SECS],
      [PROGRESSION_DELTA_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA,           BAR_LENGTH_SECS],
      [PROGRESSION_BETA,            BAR_LENGTH_SECS],
      [PROGRESSION_GAMMA,           BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA,           BAR_LENGTH_SECS],
      [PROGRESSION_BETA,            BAR_LENGTH_SECS],
      [PROGRESSION_GAMMA_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_DELTA,           BAR_LENGTH_SECS],
      [PROGRESSION_DELTA_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA,           BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA,           BAR_LENGTH_SECS],
      [PROGRESSION_BETA,            BAR_LENGTH_SECS],
      [PROGRESSION_GAMMA,           BAR_LENGTH_SECS],
      [PROGRESSION_DELTA_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA,           BAR_LENGTH_SECS],
      [PROGRESSION_BETA,            BAR_LENGTH_SECS]
    ],
    "short": [
      [PROGRESSION_BETA,            BAR_LENGTH_SECS],
      [PROGRESSION_GAMMA,           BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA,           BAR_LENGTH_SECS],
      [PROGRESSION_DELTA_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA,           BAR_LENGTH_SECS]
    ],
    "shorter": [
      [PROGRESSION_GAMMA, BAR_LENGTH_SECS],
      [PROGRESSION_ALPHA, BAR_LENGTH_SECS]
    ]
  }
};
