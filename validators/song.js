const { z } = require('zod')


const createSongSchema = z.object({
    title: z.string(),
    albumId: z.string(),
    artists: z.array(z.string()),
  })
  
  function validateCreateSong(object) {
    return createSongSchema.safeParse(object)
  }

  module.exports = {validateCreateSong}