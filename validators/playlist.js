const { z } = require('zod')


const createPlaylistSchema = z.object({
    title: z.string(),
    color: z.string(),
    owner: z.string(),
  })
  

const addSongToPlaylist = z.object({
  songId: z.string(),
  })

function validateCreatePlaylist(object) {
  return createPlaylistSchema.safeParse(object)
}

function validateAddSongToPlaylist(object) {
  return addSongToPlaylist.safeParse(object)
}


  module.exports = {validateCreatePlaylist, validateAddSongToPlaylist}