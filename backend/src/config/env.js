const required = ["DATABASE_URL", "JWT_SECRET"];

const getEnv = () => ({
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES || "7d",
  cookieName: process.env.COOKIE_NAME || "maxdy_session",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  corsOrigin: process.env.CORS_ORIGIN || process.env.CLIENT_URL || "http://localhost:5173",
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 120),
});

const assertEnv = () => {
  if ((process.env.SKIP_ENV_VALIDATION || "").toLowerCase() === "true") {
    return;
  }

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno requeridas: ${missing.join(", ")}`);
  }
};

module.exports = {
  getEnv,
  assertEnv,
};
