const { z } = require("zod");

const updateProfileSchema = z.object({
  username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_-]+$/).optional(),
  avatarUrl: z.string().url().optional().nullable(),
});

module.exports = {
  updateProfileSchema,
};
