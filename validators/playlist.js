const { z } = require('zod')


const createPlaylistSchema = z.object({
    title: z.string(),
    albumId: z.string(),
    artists: z.array(z.string()),
    color: z.string(),
    owner: z.string(),
  })
  
  function validateCreatePlaylist(object) {
    return createPlaylistSchema.safeParse(object)
  }

  module.exports = {validateCreatePlaylist}