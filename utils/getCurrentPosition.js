const { getFormatedId } = require("./getFormatedId");

function getCurrentPosition(songs, currentSong) {
  const position = songs.filter(song => getFormatedId(song.songId) === getFormatedId(currentSong._id))[0]?.position    
    return position;
  }

  module.exports = { getCurrentPosition }