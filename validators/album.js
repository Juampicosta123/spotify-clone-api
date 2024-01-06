const { z } = require('zod')


const createAlbumSchema = z.object({
    title: z.string(),
    artistOwner: z.string(),
    color: z.string()
  })
  
  function validateCreateAlbum(object) {
    return createAlbumSchema.safeParse(object)
  }

  module.exports = {validateCreateAlbum}