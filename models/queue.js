const mongoose = require('mongoose');

const QueueScheme = new mongoose.Schema(
  {
    currentSong:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'songs',
      required: true
  },
  nextSong:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'songs',
    required: true
  },
    songs: [
      {
        songId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'songs',
          required: true
        },
        played: {
          type: Boolean,
          default: false
        }
      }
    ],
    from: {
     type:mongoose.Schema.Types.ObjectId,
     required:true
    },
    fromType: {
      type: String,
      required:true
     },
     random:{
      type: Boolean,
      required:true
    },
    finished:{
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('queues', QueueScheme);