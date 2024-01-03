const express = require('express');
const { getAlbumById, createAlbum, getAlbums, deleteAlbum } = require('../controllers/album');
const uploadMiddleware = require('../middleware/uploadMedia');

const router = express.Router();

router.get('/:id',  getAlbumById);
router.get('/',  getAlbums);
router.post('/', uploadMiddleware.single('media'),  createAlbum);
router.delete('/:id',  deleteAlbum);

module.exports = router;