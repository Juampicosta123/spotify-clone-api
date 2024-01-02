const express = require('express');
const { getSongById, createSong } = require('../controllers/song');
const uploadMiddleware = require('../middleware/uploadMedia');

const router = express.Router();

router.get('/:id',  getSongById);
router.post('/', uploadMiddleware.array('media', 2),  createSong);

module.exports = router;