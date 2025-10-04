import "reflect-metadata";
import express from "express";
import router from "./routes/apiRoutes";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";

(async function main() {
  dotenv.config();

  AppDataSource.initialize()
    .then(() => {
      console.log("Conexão com banco de dados realizada com sucesso");
    })
    .catch((error) => {
      console.log(`Erro na conexão com o banco de dados: ${error} !`);
    });

  const app = express();
  app.use(express.json());
  app.use("/api", router);

  const port = process.env.API_PORT;

  app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}/api!`);
  });
})();
