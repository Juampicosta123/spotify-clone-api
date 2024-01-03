const playlistModel = require('../models/playlist.js');
const { handleHttpError } = require('../utils/handleError');
const { validateCreatePlaylist } = require('../validators/playlist');
const { uploadMedia } = require('../utils/uploadMedia.js')

const getPlaylistById = async(req, res) => {
    try{
      const {id} = req.params
      const data = await playlistModel.findById(id).populate('songs.songId').populate('albumId')
      res.send({data})
    } catch(e){
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
      .populate('songs.songId')
      .populate('albumId')


    res.send({ data });
  } catch(e){
    handleHttpError(res, "Error getting playlists")
  }
}

const createPlaylist = async (req, res) => {
    try{
      const result = validateCreatePlaylist(req.body)
      if(!result.success) throw new Error('Invalid request')
      const {title, albumId, artists, owner, color} = result.data

      if(!req.file) throw new Error('You should include image file');

      const image = req.file;
      const originalimagename = image.originalname;
      const { medialink: imagelink, extension: imageextension, medianame: imagename } = await uploadMedia(image);
      const songs = [
      {
      songId: "659441b274d0128a893ac1cf"
      },
      {
        songId: "659433c2c19de07562a712df"
        },
        {
          songId: "659433bbc19de07562a712dd"
          }
      ]
      const data = await playlistModel.create({
        title, 
        color,
        originalimagename,
        imagelink,
        imageextension,
        imagename,
        albumId, 
        artists, 
        owner,
        songs
       })

      res.send({data})
    } catch(e){
      console.log(e);
        handleHttpError(res, "Error creating playlist")
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

module.exports = {getPlaylistById, createPlaylist, getPlaylists, deletePlaylist}