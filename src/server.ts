import express from "express";
import router from "./routes/api-notes";

(async function main() {
  const app = express();
  app.use(express.json());
  app.use("/api", router);

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Servidor iniciado em localhost:${port}!`);
  });
})();
