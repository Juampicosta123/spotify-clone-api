const express = require('express');
const { getQueueById, createQueue, deleteQueue, setNextSong, setPrevSong } = require('../controllers/queue');

const router = express.Router();

router.get('/:id',  getQueueById);
router.post('/',  createQueue);
router.put('/next-song/:id', setNextSong);
router.put('/prev-song/:id', setPrevSong);
router.delete('/:id',  deleteQueue);

module.exports = router;