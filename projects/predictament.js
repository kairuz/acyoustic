const STANDARD_BEAT_NOTE  = 1/4; // quarter note beats assumed for bpm measurement

const BEATS_PER_MINUTE    = 140; // 1 quarter note = 1 beat; 200 quarter notes (400 eighth notes) per minute
const NOTES_PER_BAR       = 12;
const NOTE_TYPE           = 1/8; // song is in 12/8 time - ** I think this is INCORRECT MUSIC THEORY **
const BEATS_PER_NOTE      = STANDARD_BEAT_NOTE / NOTE_TYPE;
const BEATS_PER_BAR       = NOTES_PER_BAR * BEATS_PER_NOTE;
const BEAT_LENGTH_MILLIS  = (60000 / BEATS_PER_MINUTE) * (NOTE_TYPE / STANDARD_BEAT_NOTE);
const NOTE_LENGTH_MILLIS  = BEAT_LENGTH_MILLIS * BEATS_PER_NOTE;
const BAR_LENGTH_MILLIS   = NOTE_LENGTH_MILLIS * NOTES_PER_BAR;
const BAR_LENGTH_SECS     = (NOTE_LENGTH_MILLIS * NOTES_PER_BAR) / 1000;


// 1      &      2      &      3      &      4      &      5      &      6      &
const RHYTHM_DRUMS_KICK =
  [0, 1,     3, 4,         5, 6, 7, 9, 10 /*, 11*/ ];
const RHYTHM_DRUMS_SNARE =
  [       1.5, 4.5, 7.5, 10.5];
const RHYTHM_DRUMS_HIHAT =
  [0,  1,  2,  3, 4,  5, 6,  7, 8, 9, 10, 11      ];
const RHYTHM_DRUMS_CRASH =
  [0,          /*6,*/ ];
const RHYTHM_DRUMS_HIHAT_OPEN =
  [0,             ];
// const RHYTHM_DRUMS_HIHAT_OPEN_ACCENTED =
//   [                                   2.5                                               ];

const TIMING_DRUMS_KICK                 = RHYTHM_DRUMS_KICK.map(note => Math.round((((note * NOTE_LENGTH_MILLIS) / 1000) * 1000)) / 1000);
const TIMING_DRUMS_SNARE                = RHYTHM_DRUMS_SNARE.map(note => Math.round((((note * NOTE_LENGTH_MILLIS) / 1000) * 1000)) / 1000);
const TIMING_DRUMS_HIHAT                = RHYTHM_DRUMS_HIHAT.map(note => Math.round((((note * NOTE_LENGTH_MILLIS) / 1000) * 1000)) / 1000);
const TIMING_DRUMS_CRASH                = RHYTHM_DRUMS_CRASH.map(note => Math.round((((note * NOTE_LENGTH_MILLIS) / 1000) * 1000)) / 1000);
const TIMING_DRUMS_HIHAT_OPEN           = RHYTHM_DRUMS_HIHAT_OPEN.map(note => Math.round((((note * NOTE_LENGTH_MILLIS) / 1000) * 1000)) / 1000);
// const TIMING_DRUMS_HIHAT_OPEN_ACCENTED  = RHYTHM_DRUMS_HIHAT_OPEN_ACCENTED.map(note => (note * NOTE_LENGTH_MILLIS) / 1000);

const SAMPLE_DRUMS_CRASH      = "crash";
const SAMPLE_DRUMS_HIHAT      = "hihat";
const SAMPLE_DRUMS_HIHAT_OPEN = "hihat (open)";
const SAMPLE_DRUMS_SNARE      = "snare";
const SAMPLE_DRUMS_KICK       = "kick";
const SAMPLE_GUITAR_RHYTHM01A = "guitar (rhythm01a)";
const SAMPLE_GUITAR_RHYTHM01B = "guitar (rhythm01b)";
const SAMPLE_GUITAR_RIFF01A   = "guitar (riff01a)";
const SAMPLE_GUITAR_RIFF01B   = "guitar (riff01b)";
const SAMPLE_GUITAR_ALT01     = "alt guitar";

const PROGRESSION_RHYTHM01A = "rhythm01a";
const PROGRESSION_RHYTHM01B = "rhythm01b";
const PROGRESSION_RIFF01A   = "riff01a";
const PROGRESSION_RIFF01B   = "riff01b";
const PROGRESSION_COMBO01A = "combo01a";
const PROGRESSION_COMBO01B = "combo01b";
const PROGRESSION_RHYTHMALONE01A   = "rhythm01a alone";
const PROGRESSION_RHYTHMALONE01B   = "rhythm01b alone";
const PROGRESSION_RIFFALONE01A   = "riff01a alone";
const PROGRESSION_RIFFALONE01B  = "riff01b alone";
const PROGRESSION_COMBOALONE01A = "combo01a alone";
const PROGRESSION_COMBOALONE01B = "combo01b alone";
const PROGRESSION_ALT01   = "alt rhythm01";


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
      "path": "https://kairuz.github.io/assets/audio/samples/drums-kick.ogg",
      "gain": 0.4
    },
    [SAMPLE_GUITAR_RHYTHM01A]: {
      "path": "https://kairuz.github.io/assets/audio/samples/predictament/rhythm01a.ogg",
      "gain": 0.4
    },
    [SAMPLE_GUITAR_RHYTHM01B]: {
      "path": "https://kairuz.github.io/assets/audio/samples/predictament/rhythm01b.ogg",
      "gain": 0.4
    },
    [SAMPLE_GUITAR_RIFF01A]: {
      "path": "https://kairuz.github.io/assets/audio/samples/predictament/riff01a.ogg",
      "gain": 0.6
    },
    [SAMPLE_GUITAR_RIFF01B]: {
      "path": "https://kairuz.github.io/assets/audio/samples/predictament/riff01b.ogg",
      "gain": 0.6
    },
    [SAMPLE_GUITAR_ALT01]: {
      "path": "https://kairuz.github.io/assets/audio/samples/predictament/alt01.ogg"
    }
  },
  "progressions": {
    [PROGRESSION_RHYTHM01A]: {
      [SAMPLE_GUITAR_RHYTHM01A] : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_RHYTHM01B]: {
      [SAMPLE_GUITAR_RHYTHM01B] : [0],
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_RIFF01A]: {
      [SAMPLE_GUITAR_RIFF01A]   : [0],
      [SAMPLE_DRUMS_CRASH]      : TIMING_DRUMS_CRASH,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_RIFF01B]: {
      [SAMPLE_GUITAR_RIFF01B]   : [0],
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_COMBO01A]: {
      [SAMPLE_GUITAR_RHYTHM01A] : [0],
      [SAMPLE_GUITAR_RIFF01A]   : [0],
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_COMBO01B]: {
      [SAMPLE_GUITAR_RHYTHM01B] : [0],
      [SAMPLE_GUITAR_RIFF01B]   : [0],
      [SAMPLE_DRUMS_HIHAT_OPEN] : TIMING_DRUMS_HIHAT_OPEN,
      [SAMPLE_DRUMS_HIHAT]      : TIMING_DRUMS_HIHAT,
      [SAMPLE_DRUMS_SNARE]      : TIMING_DRUMS_SNARE,
      [SAMPLE_DRUMS_KICK]       : TIMING_DRUMS_KICK,
    },
    [PROGRESSION_RHYTHMALONE01A]: {
      [SAMPLE_GUITAR_RHYTHM01A] : [0]
    },
    [PROGRESSION_RHYTHMALONE01B]: {
      [SAMPLE_GUITAR_RHYTHM01B] : [0]
    },
    [PROGRESSION_RIFFALONE01A]: {
      [SAMPLE_GUITAR_RIFF01A] : [0]
    },
    [PROGRESSION_RIFFALONE01B]: {
      [SAMPLE_GUITAR_RIFF01B] : [0]
    },
    [PROGRESSION_COMBOALONE01A]: {
      [SAMPLE_GUITAR_RHYTHM01A] : [0],
      [SAMPLE_GUITAR_RIFF01A] : [0]
    },
    [PROGRESSION_COMBOALONE01B]: {
      [SAMPLE_GUITAR_RHYTHM01B] : [0],
      [SAMPLE_GUITAR_RIFF01B] : [0]
    },
    [PROGRESSION_ALT01]: {
      [SAMPLE_GUITAR_ALT01] : [0]
    },

  },
  "compositions": {
    "general": [
      [PROGRESSION_RIFFALONE01A,            BAR_LENGTH_SECS],
      [PROGRESSION_RIFFALONE01B,           BAR_LENGTH_SECS],
      [PROGRESSION_ALT01,           20.595],
      [PROGRESSION_RHYTHM01A,            BAR_LENGTH_SECS],
      [PROGRESSION_RHYTHM01B,           BAR_LENGTH_SECS],
      [PROGRESSION_COMBO01A,           BAR_LENGTH_SECS],
      [PROGRESSION_COMBO01B,           BAR_LENGTH_SECS],
      [PROGRESSION_RIFF01A,            BAR_LENGTH_SECS],
      [PROGRESSION_RIFF01B,  BAR_LENGTH_SECS],
      [PROGRESSION_COMBO01A,           BAR_LENGTH_SECS],
      [PROGRESSION_COMBO01B,           BAR_LENGTH_SECS],
      [PROGRESSION_ALT01,           20.595],
      [PROGRESSION_RHYTHMALONE01A,            BAR_LENGTH_SECS],
      [PROGRESSION_RHYTHMALONE01B,           BAR_LENGTH_SECS],
      [PROGRESSION_COMBO01A,           BAR_LENGTH_SECS],
      [PROGRESSION_COMBO01B,           BAR_LENGTH_SECS],
      [PROGRESSION_COMBOALONE01A,  BAR_LENGTH_SECS],
      [PROGRESSION_COMBOALONE01B,           BAR_LENGTH_SECS],
      [PROGRESSION_COMBO01A,           BAR_LENGTH_SECS],
      [PROGRESSION_COMBO01B,           BAR_LENGTH_SECS],
      [PROGRESSION_RHYTHMALONE01A,            BAR_LENGTH_SECS],
      [PROGRESSION_RHYTHMALONE01B,           BAR_LENGTH_SECS]
    ],
    "short": [
      [PROGRESSION_RHYTHM01A,            BAR_LENGTH_SECS],
      [PROGRESSION_RHYTHM01B,           BAR_LENGTH_SECS],
      [PROGRESSION_RHYTHM01A,            BAR_LENGTH_SECS],
      [PROGRESSION_RHYTHM01B,           BAR_LENGTH_SECS],
      [PROGRESSION_RHYTHM01A,            BAR_LENGTH_SECS],
      [PROGRESSION_RHYTHM01B,           BAR_LENGTH_SECS],
      [PROGRESSION_RHYTHM01A,            BAR_LENGTH_SECS],
      [PROGRESSION_RHYTHM01B,           BAR_LENGTH_SECS]
    ],
    "shorter": [
      [PROGRESSION_RHYTHM01A,           BAR_LENGTH_SECS],
      [PROGRESSION_RHYTHM01B,           BAR_LENGTH_SECS]
    ]
  }
}
