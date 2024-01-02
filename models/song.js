const mongoose = require('mongoose');

const SongScheme = new mongoose.Schema(
  {
    albumId:{
      type: String, //cambiar a mongoose.Schema.Types.ObjectId, ref: 'albums'
      require: true
    },
    medianame:{
      type: String,
      require: true
    },
    originalmedianame:{
      type: String,
      require: true
    },
    extension:{
      type: String,
      require: true
    },
    medialink:{
      type: String,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    imagename: {
      type: String,
      require: true
    }, 
    originalimagename: {
      type: String,
      require: true
    },
    imageextension: {
      type: String,
      require: true
    },
    imagelink: {
      type: String,
      require: true
    },
    artists:{
     type: [String],
     require: true
    },
    album:{
     type: String,
     require: true
    },
    duration:{
     type:String,
     require: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('songs', SongScheme);