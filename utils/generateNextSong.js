const generateNextSong = (nextSongs) => {
    const indexNextSong = Math.floor(Math.random() * nextSongs.length);
    const randomElement = nextSongs[indexNextSong]
    return randomElement
}

module.exports = { generateNextSong }