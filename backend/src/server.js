require("dotenv").config();

const app = require("./app");
const { assertEnv, getEnv } = require("./config/env");

assertEnv();

const env = getEnv();

app.listen(env.port, () => {
  console.log(`Servidor corriendo en http://localhost:${env.port}`);
});
