const ratingService = require("./rating.service");

const upsertRating = async (req, res, next) => {
  try {
    const rating = await ratingService.upsertRating(req.user.id, req.params.mangaId, req.body.score);
    res.json({ ok: true, data: rating });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upsertRating,
};
