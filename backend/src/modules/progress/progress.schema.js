const { z } = require("zod");

const progressSchema = z.object({
  chapterId: z.string(),
  pageNumber: z.number().int().min(1).default(1),
});

module.exports = {
  progressSchema,
};
