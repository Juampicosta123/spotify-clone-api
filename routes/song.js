const express = require('express');
const { getSongById, createSong, getSongs, deleteSong } = require('../controllers/song');
const uploadMiddleware = require('../middleware/uploadMedia');

const router = express.Router();

router.get('/:id',  getSongById);
router.get('/',  getSongs);
router.post('/', uploadMiddleware.array('media', 2),  createSong);
router.delete('/:id',  deleteSong);

module.exports = router;