const generateNextSong = (nextSongs) => {
    const indexNextSong = Math.floor(Math.random() * nextSongs.length);
    const randomElement = nextSongs[indexNextSong]
    console.log(randomElement);
    return randomElement
}

module.exports = { generateNextSong }