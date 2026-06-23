const progressService = require("./progress.service");

const upsertProgress = async (req, res, next) => {
  try {
    const progress = await progressService.upsertProgress(req.user.id, req.params.mangaId, req.body);
    res.json({ ok: true, data: progress });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upsertProgress,
};
