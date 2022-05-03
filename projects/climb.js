const STANDARD_BEAT_NOTE  = 1/4; // quarter note beats assumed for bpm measurement

const BEATS_PER_MINUTE    = 100; // 1 quarter note = 1 beat; 100 quarter notes (200 eighth notes) per minute
const NOTES_PER_BAR       = 7;
const NOTE_TYPE           = 1/8; // song is in 7/8 time (seven eighth notes per bar)
const BEATS_PER_NOTE      = STANDARD_BEAT_NOTE / NOTE_TYPE;
const BEATS_PER_BAR       = NOTES_PER_BAR * BEATS_PER_NOTE;
const BEAT_LENGTH_MILLIS  = (60000 / BEATS_PER_MINUTE) * (NOTE_TYPE / STANDARD_BEAT_NOTE);
const NOTE_LENGTH_MILLIS  = BEAT_LENGTH_MILLIS * BEATS_PER_NOTE;
const BAR_LENGTH_MILLIS   = NOTE_LENGTH_MILLIS * NOTES_PER_BAR;
const BAR_LENGTH_SECS     = (NOTE_LENGTH_MILLIS * NOTES_PER_BAR) / 1000;

// 1      &      2      &      3      &      4      &      5      &      6      &      7      &
const RHYTHM_DRUMS_KICK =
  [0,                          2,                   3.5,                        5.5                  ];
const RHYTHM_DRUMS_SNARE =
  [              1,                          3,                   4.5,                        6.5    ];
const RHYTHM_DRUMS_HIHAT =
  [0,            1,            2,            3,            4,            5,            6             ];
const RHYTHM_DRUMS_CRASH =
  [0                                                                                                 ];
const RHYTHM_DRUMS_HIHAT_OPEN =
  [                                                 3.5                                              ];
const RHYTHM_DRUMS_HIHAT_OPEN_ACCENTED =
  [                                          3                                                       ];

const TIMING_DRUMS_KICK                 = RHYTHM_DRUMS_KICK.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);
const TIMING_DRUMS_SNARE                = RHYTHM_DRUMS_SNARE.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);
const TIMING_DRUMS_HIHAT                = RHYTHM_DRUMS_HIHAT.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);
const TIMING_DRUMS_CRASH                = RHYTHM_DRUMS_CRASH.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);
const TIMING_DRUMS_HIHAT_OPEN           = RHYTHM_DRUMS_HIHAT_OPEN.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);
const TIMING_DRUMS_HIHAT_OPEN_ACCENTED  = RHYTHM_DRUMS_HIHAT_OPEN_ACCENTED.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);

const SAMPLE_DRUMS_CRASH      = "crash";
const SAMPLE_DRUMS_HIHAT      = "hihat";
const SAMPLE_DRUMS_HIHAT_OPEN = "hihat (open)";
const SAMPLE_DRUMS_SNARE      = "snare";
const SAMPLE_DRUMS_KICK       = "kick";
const SAMPLE_GUITAR_CHORUS01A = "guitar (chorus01a)";
const SAMPLE_GUITAR_CHORUS01B = "guitar (chorus01b)";
const SAMPLE_GUITAR_CHORUS01C = "guitar (chorus01c)";
const SAMPLE_GUITAR_CHORUS01D = "guitar (chorus01d)";
const SAMPLE_GUITAR_VERSE01A  = "guitar (verse01a)";
const SAMPLE_GUITAR_VERSE01B  = "guitar (verse01b)";
const SAMPLE_GUITAR_VERSE01C  = "guitar (verse01c)";
const SAMPLE_GUITAR_VERSE01D  = "guitar (verse01d)";

const PROGRESSION_CHORUS01A           = "chorus01a";
const PROGRESSION_CHORUS01B           = "chorus01b";
const PROGRESSION_CHORUS01C           = "chorus01c";
const PROGRESSION_CHORUS01C_ACCENTED  = "chorus01c (acc.)";
const PROGRESSION_CHORUS01D           = "chorus01d";
const PROGRESSION_CHORUS01D_ACCENTED  = "chorus01d (acc.)";
const PROGRESSION_VERSE01A            = "verse01a";
const PROGRESSION_VERSE01B            = "verse01b";
const PROGRESSION_VERSE01C            = "verse01c";
const PROGRESSION_VERSE01C_ACCENTED   = "verse01c (acc.)";
const PROGRESSION_VERSE01D            = "verse01d";
const PROGRESSION_VERSE01D_ACCENTED   = "verse01d (acc.)";

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
    [SAMPLE_GUITAR_CHORUS01A]: {
      "path": "https://kairuz.github.io/assets/audio/samples/climb/chorus01a.ogg"
    },
    [SAMPLE_GUITAR_CHORUS01B]: {
      "path": "https://kairuz.github.io/assets/audio/samples/climb/chorus01b.ogg"
    },
    [SAMPLE_GUITAR_CHORUS01C]: {
      "path": "https://kairuz.github.io/assets/audio/samples/climb/chorus01c.ogg"
    },
    [SAMPLE_GUITAR_CHORUS01D]: {
      "path": "https://kairuz.github.io/assets/audio/samples/climb/chorus01d.ogg"
    },
    [SAMPLE_GUITAR_VERSE01A]: {
      "path": "https://kairuz.github.io/assets/audio/samples/climb/verse01a.ogg"
    },
    [SAMPLE_GUITAR_VERSE01B]: {
      "path": "https://kairuz.github.io/assets/audio/samples/climb/verse01b.ogg"
    },
    [SAMPLE_GUITAR_VERSE01C]: {
      "path": "https://kairuz.github.io/assets/audio/samples/climb/verse01c.ogg"
    },
    [SAMPLE_GUITAR_VERSE01D]: {
      "path": "https://kairuz.github.io/assets/audio/samples/climb/verse01d.ogg"
    }
  },
  "progressions": {
    [PROGRESSION_CHORUS01A]: {
      [SAMPLE_GUITAR_CHORUS01A]   : [0],
      [SAMPLE_DRUMS_CRASH]        : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]        : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN]   : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]        : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]         : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_CHORUS01B]: {
      [SAMPLE_GUITAR_CHORUS01B]   : [0],
      [SAMPLE_DRUMS_CRASH]        : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]        : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN]   : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]        : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]         : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_CHORUS01C]: {
      [SAMPLE_GUITAR_CHORUS01C] : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_CHORUS01C_ACCENTED]: {
      [SAMPLE_GUITAR_CHORUS01C] : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN_ACCENTED,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_CHORUS01D]: {
      [SAMPLE_GUITAR_CHORUS01D] : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_CHORUS01D_ACCENTED]: {
      [SAMPLE_GUITAR_CHORUS01D] : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN_ACCENTED,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_VERSE01A]: {
      [SAMPLE_GUITAR_VERSE01A]  : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_VERSE01B]: {
      [SAMPLE_GUITAR_VERSE01B]  : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_VERSE01C]: {
      [SAMPLE_GUITAR_VERSE01C]  : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_VERSE01C_ACCENTED]: {
      [SAMPLE_GUITAR_VERSE01C]  : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN_ACCENTED,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_VERSE01D]: {
      [SAMPLE_GUITAR_VERSE01D]  : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_VERSE01D_ACCENTED]: {
      [SAMPLE_GUITAR_VERSE01D]  : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN_ACCENTED,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    }
  },
  "compositions": {
    "general": [
      [PROGRESSION_CHORUS01A,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01B,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01C_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01D,           BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01A,            BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01B,            BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01C_ACCENTED,   BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01D_ACCENTED,   BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01A,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01B,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01C_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01D_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01C_ACCENTED,   BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01D_ACCENTED,   BAR_LENGTH_SECS]
    ],
    "long": [
      [PROGRESSION_CHORUS01A,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01B,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01C,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01D,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01A,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01B,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01C_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01D,           BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01A,            BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01B,            BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01C,            BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01D,            BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01A,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01B,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01C,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01D,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01A,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01B,           BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01C_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_CHORUS01D_ACCENTED,  BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01A,            BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01D,            BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01C_ACCENTED,   BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01D_ACCENTED,   BAR_LENGTH_SECS]
    ],
    "shorter": [
      [PROGRESSION_VERSE01C,          BAR_LENGTH_SECS],
      [PROGRESSION_VERSE01D_ACCENTED, BAR_LENGTH_SECS]
    ]
  }
};
