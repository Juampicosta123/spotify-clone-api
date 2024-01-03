const playlistModel = require('../models/playlist.js');
const songModel = require('../models/song.js');
const albumModel = require('../models/song.js');

const { handleHttpError } = require('../utils/handleError');

const getSearch = async(req, res) => {
    try{
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || null;
      const search = req.query.search || '';
      const songs = await songModel
        .find({
          title: { $regex: search, $options: 'i' }
        })
        .sort({ _id: -1 })
        .skip(page)
        .limit(limit)
        .populate('albumId');

      const playlists = await playlistModel
      .find({
        title: { $regex: search, $options: 'i' }
      })
      .populate([{path:'songs.songId', strictPopulate: false}])
      .populate('albumId')
      .sort({ _id: -1 })
      .skip(page)
      .limit(limit);

      const albums = await albumModel
      .find({
        title: { $regex: search, $options: 'i' }
      })
      .populate({path:'songs.songId', strictPopulate: false})
      .sort({ _id: -1 })
      .skip(page)
      .limit(limit);

      const data =  [songs, playlists, albums].flat();
      res.send({ data })
    } catch(e){
    console.log(e);
      handleHttpError(res, "Error getting songs")
    }
  }

  module.exports = {getSearch}