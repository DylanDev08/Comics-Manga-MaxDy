const { z } = require("zod");

const genreSchema = z.object({
  name: z.string().min(2).max(40),
  slug: z.string().min(2).max(50).optional(),
});

module.exports = {
  genreSchema,
};
