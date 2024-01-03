const mongoose = require('mongoose');

const AlbumScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    imagename: {
      type: String,
      required: true
    }, 
    originalimagename: {
      type: String,
      required: true
    },
    imageextension: {
      type: String,
      required: true
    },
    imagelink: {
      type: String,
      required: true
    },
    duration:{
     type:String,
     required: true
    },
    songs: [
      {
        songId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'songs'
        }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('albums', AlbumScheme);