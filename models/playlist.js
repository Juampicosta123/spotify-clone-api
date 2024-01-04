const mongoose = require('mongoose');

const PlaylistScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    color: {
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
    owner:{
     type:String,
     required: true
    },
    artists:{
        type: [String],
        required: true
    },
    songs: {
    type: [ mongoose.Schema.Types.ObjectId],
    ref: 'songs',
    required:false
  }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('playlists', PlaylistScheme);