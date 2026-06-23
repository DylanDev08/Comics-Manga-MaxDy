const { z } = require("zod");

const librarySchema = z.object({
  mangaId: z.string(),
  status: z.enum(["READING", "PLANNED", "COMPLETED", "DROPPED", "PAUSED"]).default("READING"),
});

module.exports = {
  librarySchema,
};
