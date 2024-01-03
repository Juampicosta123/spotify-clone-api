const mongoose = require('mongoose');

const SongScheme = new mongoose.Schema(
  {
    albumId:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'albums',
      required: true
    },
    medianame:{
      type: String,
      required: true
    },
    originalmedianame:{
      type: String,
      required: true
    },
    extension:{
      type: String,
      required: true
    },
    medialink:{
      type: String,
      required: true
    },
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
    artists:{
     type: [String],
     required: true
    },
    album:{
     type: String,
     required: true
    },
    duration:{
     type:String,
     required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('songs', SongScheme);