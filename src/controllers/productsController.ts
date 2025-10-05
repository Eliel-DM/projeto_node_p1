import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/products";
import { PaginationService } from "../services/paginationServices";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    // Paginação
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await PaginationService.paginate(
      productRepository,
      page,
      limit,
      { id: "DESC" }
    );

    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao recuperar produtos: ${error}`,
    });
    return;
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({
      where: { id: parseInt(id) },
      relations: ["productCategory", "productSituation"], // Inclui relações
    });

    if (!product) {
      res.status(404).json({
        message: "Produto não encontrado!",
      });
      return;
    }

    res.status(200).json(product);
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao buscar produto: ${error}`,
    });
    return;
  }
};

export const postProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const productRepository = AppDataSource.getRepository(Product);

    // Verifica se já existe produto com mesmo nome
    const existingProduct = await productRepository.findOne({
      where: { name: data.name },
    });

    if (existingProduct) {
      res.status(400).json({
        message: "Já existe um produto com este nome!",
      });
      return;
    }

    const newProduct = productRepository.create(data);
    await productRepository.save(newProduct);

    res.status(201).json({
      message: "Produto cadastrado com sucesso!",
      product: newProduct,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao cadastrar produto: ${error}`,
    });
    return;
  }
};

export const putProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({
      id: parseInt(id),
    });

    if (!product) {
      res.status(404).json({
        message: "Produto não encontrado!",
      });
      return;
    }

    // Verifica se o novo nome já existe em outro produto
    if (data.name && data.name !== product.name) {
      const existingProduct = await productRepository.findOne({
        where: { name: data.name },
      });

      if (existingProduct) {
        res.status(400).json({
          message: "Já existe outro produto com este nome!",
        });
        return;
      }
    }

    productRepository.merge(product, data);
    const updatedProduct = await productRepository.save(product);

    res.status(200).json({
      message: "Produto atualizado com sucesso!",
      product: updatedProduct,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao atualizar produto: ${error}`,
    });
    return;
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({
      id: parseInt(id),
    });

    if (!product) {
      res.status(404).json({
        message: "Produto não encontrado!",
      });
      return;
    }

    await productRepository.remove(product);

    res.status(200).json({
      message: "Produto apagado com sucesso!",
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao apagar produto: ${error}`,
    });
    return;
  }
};
