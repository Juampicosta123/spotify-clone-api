const express = require('express');
const { getPlaylistById, createPlaylist, getPlaylists, deletePlaylist } = require('../controllers/playlist');
const uploadMiddleware = require('../middleware/uploadMedia');

const router = express.Router();

router.get('/:id',  getPlaylistById);
router.get('/',  getPlaylists);
router.post('/', uploadMiddleware.single('media'),  createPlaylist);
router.delete('/:id',  deletePlaylist);

module.exports = router;