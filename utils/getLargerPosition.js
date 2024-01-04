function getLargerPosition(songs) {
    const positions = songs.map(song => song.position)

    if (positions.length === 0) {
      return null;
    }
  
    let largerNumber = positions[0];
  
    for (let i = 1; i < positions.length; i++) {
      if(positions[i] !== 0){
        if (positions[i] > largerNumber) {
          largerNumber = positions[i];
        }
      }
    }
    return largerNumber + 1;
  }

  module.exports = { getLargerPosition }