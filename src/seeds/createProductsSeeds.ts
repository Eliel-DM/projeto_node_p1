// src/seeds/createProductsSeeds.ts
import { DataSource } from "typeorm";
import { ProductSituation } from "../entity/productsSituation";
import { ProductCategory } from "../entity/productsCategories";
import { Product } from "../entity/products";

export default class CreateProductsSeeds {
  public async run(datasource: DataSource): Promise<void> {
    console.log("📦 Iniciando seed de produtos...");

    // 1. Seed para Situações de Produto
    const situationRepository = datasource.getRepository(ProductSituation);
    let savedSituations = await situationRepository.find();
    if (savedSituations.length === 0) {
      const situations = [
        { name: "Disponível" },
        { name: "Indisponível" },
        { name: "Em Falta" },
        { name: "Descontinuado" },
      ];
      savedSituations = await situationRepository.save(situations);
      console.log("✅ Situações de produto criadas!");
    } else {
      console.log(
        "Situações de produto já existentes. Nenhuma alteração feita."
      );
    }

    // 2. Seed para Categorias de Produto
    const categoryRepository = datasource.getRepository(ProductCategory);
    let savedCategories = await categoryRepository.find();
    if (savedCategories.length === 0) {
      const categories = [
        { name: "Eletrônicos" },
        { name: "Informática" },
        { name: "Smartphones" },
        { name: "Acessórios" },
        { name: "Games" },
      ];
      savedCategories = await categoryRepository.save(categories);
      console.log("✅ Categorias de produto criadas!");
    } else {
      console.log(
        "Categorias de produto já existentes. Nenhuma alteração feita."
      );
    }

    // 3. Seed para Produtos
    const productRepository = datasource.getRepository(Product);
    const existingProducts = await productRepository.count();
    if (existingProducts === 0) {
      // Funções auxiliares para buscar objetos
      const getCategory = (name: string) =>
        savedCategories.find((c) => c.name === name)!;
      const getSituation = (name: string) =>
        savedSituations.find((s) => s.name === name)!;

      const productsData: Partial<Product>[] = [
        {
          name: "iPhone 15 Pro",
          productCategory: getCategory("Smartphones"),
          productSituation: getSituation("Disponível"),
        },
        {
          name: "Notebook Dell Inspiron",
          productCategory: getCategory("Informática"),
          productSituation: getSituation("Disponível"),
        },
        {
          name: "Mouse Gamer RGB",
          productCategory: getCategory("Acessórios"),
          productSituation: getSituation("Indisponível"),
        },
        {
          name: "PlayStation 5",
          productCategory: getCategory("Games"),
          productSituation: getSituation("Em Falta"),
        },
      ];

      await productRepository.save(productsData);
      console.log("✅ Produtos criados!");
    } else {
      console.log("Produtos já existentes. Nenhuma alteração feita.");
    }

    console.log("Seed de produtos concluída com sucesso!");
  }
}
