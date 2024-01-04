const { getFormatedId } = require("./getFormatedId");

function getCurrentPosition(songs, currentSong) {
    console.log(songs, currentSong);
    const position = songs.filter(song => getFormatedId(song.songId) === getFormatedId(currentSong))[0].position

    
    return position;
  }

  module.exports = { getCurrentPosition }