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
     required:false
    },
    songs: {
      type: [ mongoose.Schema.Types.ObjectId],
      ref: 'songs',
      required:false
    },
    artistOwner:{
      type:String,
      required:true
    },
    color: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('albums', AlbumScheme);