const { z } = require("zod");

const ratingSchema = z.object({
  score: z.number().int().min(1).max(10),
});

module.exports = {
  ratingSchema,
};
