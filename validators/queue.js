const { z } = require('zod')


const createQueueSchema = z.object({
  random: z.boolean(),
  from: z.string(),
  fromType: z.string(),
});

function validateCreateQueue(object) {
  return createQueueSchema.safeParse(object)
}

module.exports = {validateCreateQueue}