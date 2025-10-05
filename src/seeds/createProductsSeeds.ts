// src/scripts/seed-products.ts
import { AppDataSource } from "../data-source";
import { ProductSituation } from "..//entity/productsSituation";
import { ProductCategory } from "../entity/productsCategories";
import { Product } from "../entity/products";

async function seedProducts() {
  try {
    await AppDataSource.initialize();
    console.log("📦 Iniciando seed de produtos...");

    // 1. Seed para Situações de Produto
    const situationRepository = AppDataSource.getRepository(ProductSituation);
    const situations = [
      { name: "Disponível" },
      { name: "Indisponível" },
      { name: "Em Falta" },
      { name: "Descontinuado" },
    ];

    const savedSituations = await situationRepository.save(situations);
    console.log("✅ Situações de produto criadas:", savedSituations);

    // 2. Seed para Categorias de Produto
    const categoryRepository = AppDataSource.getRepository(ProductCategory);
    const categories = [
      { name: "Eletrônicos" },
      { name: "Informática" },
      { name: "Smartphones" },
      { name: "Acessórios" },
      { name: "Games" },
    ];

    const savedCategories = await categoryRepository.save(categories);
    console.log("✅ Categorias de produto criadas:", savedCategories);

    // 3. Seed para Produtos
    const productRepository = AppDataSource.getRepository(Product);
    const products = [
      {
        name: "iPhone 15 Pro",
        productCategoryId: savedCategories[2].id, // Smartphones
        productSituationId: savedSituations[0].id, // Disponível
      },
      {
        name: "Notebook Dell Inspiron",
        productCategoryId: savedCategories[1].id, // Informática
        productSituationId: savedSituations[0].id, // Disponível
      },
      {
        name: "Mouse Gamer RGB",
        productCategoryId: savedCategories[3].id, // Acessórios
        productSituationId: savedSituations[1].id, // Indisponível
      },
      {
        name: "PlayStation 5",
        productCategoryId: savedCategories[4].id, // Games
        productSituationId: savedSituations[2].id, // Em Falta
      },
    ];

    const savedProducts = await productRepository.save(products);
    console.log(" Produtos criados:", savedProducts);

    console.log(" Seed concluído com sucesso!");
  } catch (error) {
    console.error(" Erro no seed:", error);
  } finally {
    await AppDataSource.destroy();
  }
}

seedProducts();
