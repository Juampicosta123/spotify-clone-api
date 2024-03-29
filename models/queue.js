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
        },
        position:{
          type: Number,
          default: 0
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
    finished:{
      type: Boolean,
      default: false
    },
    firstSong:{
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('queues', QueueScheme);