const { getEnv } = require("../config/env");

const buckets = new Map();

const rateLimit = ({ windowMs, max, keyPrefix = "global" } = {}) => {
  const env = getEnv();
  const limitWindow = windowMs || env.rateLimitWindowMs;
  const maxRequests = max || env.rateLimitMax;

  return (req, res, next) => {
    const key = `${keyPrefix}:${req.ip}`;
    const now = Date.now();
    const bucket = buckets.get(key) || { count: 0, resetAt: now + limitWindow };

    if (bucket.resetAt <= now) {
      bucket.count = 0;
      bucket.resetAt = now + limitWindow;
    }

    bucket.count += 1;
    buckets.set(key, bucket);

    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader("X-RateLimit-Remaining", Math.max(0, maxRequests - bucket.count));
    res.setHeader("X-RateLimit-Reset", Math.ceil(bucket.resetAt / 1000));

    if (bucket.count > maxRequests) {
      return res.status(429).json({
        ok: false,
        message: "Demasiadas solicitudes. Intenta nuevamente en unos minutos.",
      });
    }

    return next();
  };
};

module.exports = rateLimit;
