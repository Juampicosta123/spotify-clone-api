const songModel = require('../models/song');
const albumModel = require('../models/album');
const { handleHttpError } = require('../utils/handleError');
const { validateCreateSong } = require('../validators/song');
const { uploadSong } = require('../utils/uploadMedia.js')
const { getFormatedId } = require('../utils/getFormatedId.js')

const getSongById = async(req, res) => {
    try{
      const {id} = req.params
      const data = await songModel.findById(id).populate('albumId')
      res.send({data})
    } catch(e){
      console.log(e);
      handleHttpError(res, "Error getting song")
    }
}

const getSongs = async(req, res) => {
  try{
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || null;
    const search = req.query.search || '';
    const data = await songModel
      .find({
        title: { $regex: search, $options: 'i' }
      })
      .sort({ _id: -1 })
      .skip(page)
      .limit(limit)
      .populate('albumId');
      
    res.send({ data })
  } catch(e){
    handleHttpError(res, "Error getting songs")
  }
}

const createSong = async (req, res) => {
    try{
      const result = validateCreateSong(req.body)
      if(!result.success) return res.status(400).send({error: result.error.issues})
     
      const {title, albumId, artists} = result.data

      if(!req.file) throw new Error('You should include audio file');

      const audio = req.file;
      const originalmedianame = audio.originalname;
      const { medialink, extension, medianame, duration } = await uploadSong(audio);

      const album = await albumModel.findById(albumId)

      const data = await songModel.create({
        title, 
        albumId, 
        album: album.title, 
        duration,  
        artists, 
        originalmedianame,
        medialink, 
        extension, 
        medianame
      })
      await albumModel.findByIdAndUpdate(albumId, {
        $addToSet: {
          "songs": { $each: [data._id] }        }
      }
      )

      res.send({data})
    } catch(e){
      console.log(e);
        handleHttpError(res, "Error creating song")
    }
}

const deleteSong = async(req, res) => {
  try{
    const {id} = req.params
    const data = await songModel.findByIdAndDelete(id)
    res.send({data})
  } catch(e){
    handleHttpError(res, "Error deleting song")
  }
}

module.exports = {getSongById, createSong, getSongs, deleteSong}