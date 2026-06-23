const rankingService = require("./ranking.service");

const getRankings = async (req, res, next) => {
  try {
    const rankings = await rankingService.getRankings();
    res.json({ ok: true, data: rankings });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRankings,
};
