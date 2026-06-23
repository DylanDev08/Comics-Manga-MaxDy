const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const routes = require("./routes/index.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const rateLimit = require("./middlewares/rateLimit.middleware");
const { getEnv } = require("./config/env");

const app = express();
const env = getEnv();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: env.corsOrigin.split(",").map((origin) => origin.trim()),
    credentials: true,
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Manga MaxDy API funcionando",
  });
});

app.get("/health", (req, res) => {
  res.json({ ok: true, status: "healthy" });
});

app.use("/api/v1", routes);
app.use("/api", routes);

app.use(errorMiddleware);

module.exports = app;
