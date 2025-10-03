import express from "express";
import router from "./routes/loginRouter";
import dotenv from "dotenv";

(async function main() {
  dotenv.config();
  const app = express();
  app.use(express.json());
  app.use("/api", router);

  //const teste = process.env.DB_USERNAME;

  const port = process.env.API_PORT;
  app.listen(port, () => {
    console.log(`Servidor iniciado em localhost:${port}!`);
  });
})();
