import { AppDataSource } from "./data-source";
import CreateSituationsSeeds from "./seeds/createSituationsSeeds";

const runSeeds = (async () => {
  console.log("Conectando ao banco de dados");
  await AppDataSource.initialize();
  console.log("Banco de dados conectado!");

  try {
    const situationsSeeds = new CreateSituationsSeeds(); // Criando a classe
    await situationsSeeds.run(AppDataSource); // Executa as seeds
  } catch (error) {
    console.log("Erro ao executar o seed:", error);
  } finally {
    await AppDataSource.destroy();
    console.log("Conexão com o banco de dados encerrada.");
  }
})();
