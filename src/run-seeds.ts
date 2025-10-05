import { AppDataSource } from "./data-source";
import CreateSituationsSeeds from "./seeds/createSituationsSeeds";
import CreateProductsSeeds from "./seeds/createProductsSeeds"; // import da nova seed

(async () => {
  console.log("Conectando ao banco de dados🤖");
  await AppDataSource.initialize();
  console.log("Banco de dados conectado!🫂");

  try {
    // Executa a seed de situations
    const situationsSeeds = new CreateSituationsSeeds();
    await situationsSeeds.run(AppDataSource);

    // Executa a seed de products
    const productsSeeds = new CreateProductsSeeds();
    await productsSeeds.run(AppDataSource);
  } catch (error) {
    console.log("Erro ao executar o seed:", error);
  } finally {
    await AppDataSource.destroy();
    console.log("Conexão com o banco de dados encerrada. 🚀");
  }
})();
