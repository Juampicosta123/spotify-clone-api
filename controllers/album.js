const albumModel = require('../models/album.js');
const { handleHttpError } = require('../utils/handleError');
const { validateCreateAlbum } = require('../validators/album');
const { uploadMedia } = require('../utils/uploadMedia.js')

const getAlbumById = async(req, res) => {
    try{
      const {id} = req.params
      const data = await albumModel.findById(id).populate('songs.songId')
      res.send({data})
    } catch(e){
      handleHttpError(res, "Error getting album")
    }
}

const getAlbums = async(req, res) => {
  try{
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || null;
    const search = req.query.search || '';
    const data = await albumModel
      .find({
        title: { $regex: search, $options: 'i' }
      })
      .sort({ _id: -1 })
      .skip(page)
      .limit(limit)
      .populate('songs.songId');

    res.send({ data });
  } catch(e){
    handleHttpError(res, "Error getting albums")
  }
}

const createAlbum = async (req, res) => {
    try{
      const result = validateCreateAlbum(req.body)
      if(!result.success) throw new Error('Invalid request')
      const {title, duration, songs} = result.data

      if(!req.file) throw new Error('You should include image file');

      const image = req.file;
      const originalimagename = image.originalname;
      const { medialink: imagelink, extension: imageextension, medianame: imagename } = await uploadMedia(image);

      const data = await albumModel.create({
        title, 
        originalimagename,
        imagelink,
        imageextension,
        imagename,
        duration,
        songs
       })

      res.send({data})
    } catch(e){
        handleHttpError(res, "Error creating album")
    }
}

const deleteAlbum = async(req, res) => {
  try{
    const {id} = req.params
    const data = await albumModel.findByIdAndDelete(id)
    res.send({data})
  } catch(e){
    handleHttpError(res, "Error deleting album")
  }
}

module.exports = {getAlbumById, createAlbum, getAlbums, deleteAlbum}