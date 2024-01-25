const playlistModel = require('../models/playlist.js');
const songModel = require('../models/song.js');
const { handleHttpError } = require('../utils/handleError');
const { validateCreatePlaylist, validateAddSongToPlaylist } = require('../validators/playlist');
const { uploadImage } = require('../utils/uploadMedia.js')

const getPlaylistById = async(req, res) => {
    try{
      const {id} = req.params
      const data = await playlistModel.findById(id).populate('songs')
      res.send({data})
    } catch(e){
      console.log(e);
      handleHttpError(res, "Error getting playlist")
    }
}

const getPlaylists = async(req, res) => {
  try{
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || null;
    const search = req.query.search || '';
    const data = await playlistModel
      .find({
        title: { $regex: search, $options: 'i' }
      })
      .sort({ _id: -1 })
      .skip(page)
      .limit(limit)
      .populate('songs')

    res.send({ data });
  } catch(e){
    handleHttpError(res, "Error getting playlists")
  }
}

const createPlaylist = async (req, res) => {
    try{
      const result = validateCreatePlaylist(req.body)
      if(!result.success) throw new Error('Invalid request')
      const {title, owner, color} = result.data

      if(!req.file) throw new Error('You should include image file');

      const image = req.file;
      const originalimagename = image.originalname;
      const { medialink: imagelink, extension: imageextension, medianame: imagename } = await uploadImage(image);

      const data = await playlistModel.create({
        title, 
        color,
        originalimagename,
        imagelink,
        imageextension,
        imagename,
        owner
       })

      res.send({data})
    } catch(e){
      console.log(e);
        handleHttpError(res, "Error creating playlist")
    }
}

const addSongToPlaylist = async(req, res) => {
  try{
    const {id} = req.params
    const result = validateAddSongToPlaylist(req.body)
    if(!result.success) throw new Error('Invalid request')
    const {songId} = result.data

    const song = await songModel.findById(songId)

    const artists = song.artists
     
    const data = await playlistModel.findByIdAndUpdate(id, {
      $addToSet: {
        "songs": { $each: [songId] },
        "artists": { $each: artists }
      }
    })
    res.send({data})
  } catch(e){
    console.log(e);
    handleHttpError(res, "Error adding song to playlist")
  }
}

const deleteSongFromPlaylist = async(req, res) => {
  try{
    const {id} = req.params
    const result = validateAddSongToPlaylist(req.body)
    if(!result.success) throw new Error('Invalid request')
    const {songId} = result.data
    const data = await playlistModel.findByIdAndUpdate(id, {
      $pull: {
        "songs": songId
      }
    });
    res.send({data})
  } catch(e){
    console.log(e);
    handleHttpError(res, "Error deleting song from playlist")
  }
}

const deletePlaylist = async(req, res) => {
  try{
    const {id} = req.params
    const data = await playlistModel.findByIdAndDelete(id)
    res.send({data})
  } catch(e){
    handleHttpError(res, "Error deleting playlist")
  }
}

module.exports = {getPlaylistById, createPlaylist, getPlaylists, deletePlaylist, addSongToPlaylist, deleteSongFromPlaylist}