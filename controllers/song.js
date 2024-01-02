const songModel = require('../models/song');
const { handleHttpError } = require('../utils/handleError');
const { validateCreateSong } = require('../validators/song');
const { uploadMedia } = require('../utils/uploadMedia.js')

const getSongById = async(req, res) => {
    try{
      const {id} = req.params
      const data = await songModel.findById(id)
      res.send({data})
    } catch(e){
      handleHttpError(res, "Error getting item")
    }
}

const createSong = async (req, res) => {
    try{
      const result = validateCreateSong(req.body)
      if(!result.success) return res.status(400).send({error: result.error.issues})
      const {title, album, albumId, artists, duration} = result.data

      if(req.files.length !== 2) throw new Error('You should include both files');

      const audio = req.files[1];
      const originalmedianame = audio.originalname;
      const { medialink, extension, medianame } = await uploadMedia(audio);

      const image = req.files[0];
      const originalimagename = image.originalname;
      const { medialink: imagelink, extension: imageextension, medianame: imagename } = await uploadMedia(image);

      const data = await songModel.create({
        title, 
        originalimagename,
        imagelink,
        imageextension,
        imagename,
        albumId, 
        album, 
        duration,  
        artists, 
        originalmedianame,
        medialink, 
        extension, 
        medianame})

      res.send({data})
    } catch(e){
        handleHttpError(res, "Error creating item")
    }
}

module.exports = {getSongById, createSong}