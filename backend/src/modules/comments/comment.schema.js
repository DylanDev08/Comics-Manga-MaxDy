const { z } = require("zod");

const createCommentSchema = z.object({
  content: z.string().min(2).max(1200),
  chapterId: z.string().optional(),
  threadId: z.string().optional(),
});

const updateCommentSchema = z.object({
  content: z.string().min(2).max(1200),
});

const reportCommentSchema = z.object({
  reason: z.string().min(3).max(80),
  details: z.string().max(500).optional(),
});

const commentStatusSchema = z.object({
  status: z.enum(["VISIBLE", "HIDDEN", "REPORTED", "DELETED"]),
});

module.exports = {
  createCommentSchema,
  updateCommentSchema,
  reportCommentSchema,
  commentStatusSchema,
};
