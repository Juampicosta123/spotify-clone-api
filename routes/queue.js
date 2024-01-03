const express = require('express');
const { getQueueById, createQueue, deleteQueue, setRandomQueue, setNextSong } = require('../controllers/queue');

const router = express.Router();

router.get('/:id',  getQueueById);
router.post('/',  createQueue);
router.put('/random/:id',  setRandomQueue);
router.put('/next-song/:id', setNextSong);
router.delete('/:id',  deleteQueue);

module.exports = router;