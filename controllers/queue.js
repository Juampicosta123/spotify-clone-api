const queueModel = require('../models/queue.js');
const songModel = require('../models/song.js');
const playlistModel = require('../models/playlist.js');
const albumModel = require('../models/album.js');
const { handleHttpError } = require('../utils/handleError');
const { validateCreateQueue } = require('../validators/queue');
const { getFormatedId } = require('../utils/getFormatedId.js');
const { generateNextSong } = require('../utils/generateNextSong.js')
const { getLargerPosition } = require('../utils/getLargerPosition.js');
const { getCurrentPosition } = require('../utils/getCurrentPosition.js');

const getQueueById = async(req, res) => {
    try{
      const {id} = req.params
      const data = await queueModel.findById(id).populate('songs.songId').populate('currentSong')
      if(data?.fromType === "Album") await data.populate({path: 'from', model: 'albums'})
      if(data?.fromType === "Playlist") await data.populate({path: 'from', model: 'playlists'})
      if(data?.fromType === "Song") await data.populate({path: 'from', model: 'songs'})
      res.send({data})
    } catch(e){
      handleHttpError(res, "Error getting queue")
    }
}

const setRandomQueue = async(req, res) => {
  try{
    const {id} = req.params
    const data = await queueModel.findByIdAndUpdate(id, [ { "$set": { "random": { "$eq": [false, "$random"] } } } ])
  
    res.send({data})
  } catch(e){
    handleHttpError(res, "Error setting random to queue")
  }
}

const setNextSong = async(req, res) => {
  try{
    const {id} = req.params
    const data = await queueModel.findById(id).lean()

    const currentSong = getFormatedId(data.nextSong)
    let nextSong
    const dataSongs = data.songs
    
    let songs = dataSongs.map(song => 
    getFormatedId(song.songId) === getFormatedId(data.nextSong) ? { ...song, played: true, position: song.position === 0 ? getLargerPosition(dataSongs) : song.position  } : song
    );

    if(getFormatedId(data.currentSong) === getFormatedId(data.nextSong)) throw new Error('This song is the last')

    const nextSongs =  songs.filter(song => song.played === false );

    if(data.finished) throw new Error('This song is the last')

    if(data.random === true){
      const randomElement = generateNextSong(nextSongs)
      if(nextSongs.length === 0) {
        await queueModel.findByIdAndUpdate(id, {finished: true})
        nextSong = data.nextSong
      } else {
        nextSong = getFormatedId(randomElement.songId)
      }
    } else {
        const songsIds = dataSongs?.map(({ songId }) => getFormatedId(songId))
        const currentSongId = getFormatedId(currentSong)
        const indexNextSong = songsIds?.indexOf(currentSongId) + 1
        if(indexNextSong === songsIds.length) {
        await queueModel.findByIdAndUpdate(id, {finished: true})
        nextSong = currentSong
      } else {
        nextSong = getFormatedId(songs[indexNextSong]?.songId)
      }
    }
    const updated = await queueModel.findByIdAndUpdate(id, {currentSong, nextSong, songs})
    res.send({updated})
  } catch(e){
    console.log(e);
    handleHttpError(res, "Error setting next song to queue")
  }
}

const setPrevSong = async(req, res) => {
  try{
    const {id} = req.params
    const data = await queueModel.findById(id).lean()
    const songs = data.songs

    const currentPosition = getCurrentPosition(songs, data.currentSong)

    if(currentPosition === 1) throw new Error('This is the first song')

    const prevPosition = currentPosition - 1



    const currentSong = songs.filter(song => song.position === prevPosition)[0].songId
    const nextSong = data.currentSong


    const updated = await queueModel.findByIdAndUpdate(id, {currentSong, nextSong, songs, finished: false})
    res.send({updated})
  } catch(e){
    console.log(e);
    handleHttpError(res, "Error setting prev song to queue")
  }
}

const createQueue = async (req, res) => {
    try{
      const result = validateCreateQueue(req.body)
      if(!result.success) throw new Error('Invalid request')
      const { from, fromType, random } = result.data

      let fromSongs;
      let currentSong;
      let nextSong;

      if(fromType === "Album") {
        const response = await albumModel.findById(from).select('songs')
        fromSongs = response.songs
      }
      if(fromType === "Playlist") {
        const response = await playlistModel.findById(from).select('songs')
        fromSongs = response.songs
      }
      if(fromType === "Song") songs = [await songModel.findById(from)]

      if(random) {
        const randomElementCurrent = generateNextSong(fromSongs)
        currentSong = randomElementCurrent.songId
        const nextSongs =  fromSongs.filter(song => song.songId !== currentSong );
        const randomElementNext= generateNextSong(nextSongs)
        nextSong = randomElementNext.songId
      } else {
        currentSong = fromSongs[0]?.songId
        nextSong = fromSongs[1]?.songId
      }

      const songs =  fromSongs.map((song) => 
      song.songId === currentSong ? { ...song, played: true, position: 1 } : song
    );

      const data = await queueModel.create({currentSong, songs, from, fromType, nextSong, random})

      res.send({data})
    } catch(e){
      console.log(e);
      handleHttpError(res, "Error creating queue")
    }
}

const deleteQueue = async(req, res) => {
  try{
    const {id} = req.params
    const data = await queueModel.findByIdAndDelete(id)
    res.send({data})
  } catch(e){
    handleHttpError(res, "Error deleting queue")
  }
}

module.exports = {getQueueById, createQueue, deleteQueue, setRandomQueue, setNextSong, setPrevSong }