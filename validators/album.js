const { z } = require('zod')


const createAlbumSchema = z.object({
    title: z.string(),
    duration: z.string(),
    songs: z.array(z.object({
      songId: z.string(),
  })),
  })
  
  function validateCreateAlbum(object) {
    return createAlbumSchema.safeParse(object)
  }

  module.exports = {validateCreateAlbum}