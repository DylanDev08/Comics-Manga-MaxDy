const { z } = require("zod");

const commentStatusSchema = z.object({
  status: z.enum(["VISIBLE", "HIDDEN", "REPORTED", "DELETED"]),
});

module.exports = {
  commentStatusSchema,
};
