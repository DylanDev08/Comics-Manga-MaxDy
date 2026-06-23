const { z } = require("zod");

const chapterSchema = z.object({
  mangaId: z.string(),
  number: z.number().int().positive(),
  title: z.string().min(1),
  publicationDate: z.coerce.date().optional(),
  isPublished: z.boolean().optional(),
  pages: z
    .array(
      z.object({
        pageNumber: z.number().int().positive(),
        imageUrl: z.string().url(),
        altText: z.string().optional(),
      })
    )
    .optional(),
});

module.exports = {
  chapterSchema,
};
