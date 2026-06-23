const { z } = require("zod");

const statusEnum = z.enum(["ONGOING", "FINISHED", "PAUSED", "CANCELLED", "UPCOMING"]);

const listMangasSchema = z.object({
  search: z.string().trim().optional(),
  genre: z.string().trim().optional(),
  status: statusEnum.optional(),
  sort: z.enum(["ranking", "popularidad", "popularity", "score", "createdAt"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

const mangaSchema = z.object({
  title: z.string().min(2),
  alternativeTitle: z.string().optional(),
  description: z.string().min(10),
  coverUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  author: z.string().optional(),
  status: statusEnum.default("ONGOING"),
  publicationStart: z.coerce.date().optional(),
  publicationEnd: z.coerce.date().optional(),
  score: z.number().min(0).max(10).optional(),
  ranking: z.number().int().positive().optional(),
  popularity: z.number().int().min(0).optional(),
  isPublished: z.boolean().optional(),
  genreIds: z.array(z.string()).optional(),
});

module.exports = {
  listMangasSchema,
  mangaSchema,
};
