const queueModel = require('../models/queue.js');
const songModel = require('../models/song.js');
const playlistModel = require('../models/playlist.js');
const albumModel = require('../models/album.js');
const { handleHttpError } = require('../utils/handleError');
const { validateCreateQueue } = require('../validators/queue');
const { getFormatedId } = require('../utils/getFormatedId.js');
const {generateNextSong} = require('../utils/generateNextSong.js')

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
    console.log(e);
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
    const songsIds = dataSongs?.map(({ songId }) => getFormatedId(songId))
    const currentSongId = getFormatedId(currentSong)
    const currentSongIndex = songsIds?.indexOf(currentSongId)
    let songs = dataSongs.map((song, index) => 
    index === currentSongIndex ? { ...song, played: true } : song
    );

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
        const indexNextSong = songsIds?.indexOf(currentSongId) + 1
        if(indexNextSong === songsIds.length) {
        await queueModel.findByIdAndUpdate(id, {finished: true})
        nextSong = currentSong
      } else {
        nextSong = getFormatedId(songs[indexNextSong]?.songId)
      }
    }
    if(currentSong === nextSong) throw new Error('This song is the last')
    const updated = await queueModel.findByIdAndUpdate(id, {currentSong, nextSong, songs})
    res.send({updated})
  } catch(e){
    console.log(e);
    handleHttpError(res, "Error setting next song to queue")
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
      
      const songs =  fromSongs.map((song) => 
      song.songId === currentSong ? { ...song, played: true } : song
    );

      if(random) {
        const randomElementCurrent = generateNextSong(fromSongs)
        currentSong = randomElementCurrent.songId
        const nextSongs =  songs.filter(song => song.songId !== currentSong );
        const randomElementNext= generateNextSong(nextSongs)
        nextSong = randomElementNext.songId
       console.log(currentSong, nextSongs);
      } else {
        currentSong = fromSongs[0]?.songId
        nextSong = fromSongs[1]?.songId
      }
    

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

module.exports = {getQueueById, createQueue, deleteQueue, setRandomQueue, setNextSong}