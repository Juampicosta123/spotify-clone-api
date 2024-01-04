const express = require('express');
const { getPlaylistById, createPlaylist, getPlaylists, deletePlaylist, addSongToPlaylist, deleteSongFromPlaylist } = require('../controllers/playlist');
const uploadMiddleware = require('../middleware/uploadMedia');

const router = express.Router();

router.get('/:id',  getPlaylistById);
router.get('/',  getPlaylists);
router.post('/', uploadMiddleware.single('media'),createPlaylist);
router.put('/add-song/:id', addSongToPlaylist);
router.put('/delete-song/:id', deleteSongFromPlaylist);
router.delete('/:id',  deletePlaylist);

module.exports = router;