import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ProductCategory } from "../entity/productsCategories";
import { PaginationService } from "../services/paginationServices";

export const getProductCategories = async (req: Request, res: Response) => {
  try {
    const categoryRepository = AppDataSource.getRepository(ProductCategory);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await PaginationService.paginate(
      categoryRepository,
      page,
      limit,
      { id: "DESC" }
    );

    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao recuperar categorias: ${error}`,
    });
    return;
  }
};

export const getProductCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const categoryRepository = AppDataSource.getRepository(ProductCategory);
    const category = await categoryRepository.findOneBy({
      id: parseInt(id),
    });

    if (!category) {
      res.status(404).json({
        message: "Categoria não encontrada!",
      });
      return;
    }

    res.status(200).json(category);
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao buscar categoria: ${error}`,
    });
    return;
  }
};

export const postProductCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const categoryRepository = AppDataSource.getRepository(ProductCategory);

    const existingCategory = await categoryRepository.findOne({
      where: { name: data.name },
    });

    if (existingCategory) {
      res.status(400).json({
        message: "Já existe uma categoria com este nome!",
      });
      return;
    }

    const newCategory = categoryRepository.create(data);
    await categoryRepository.save(newCategory);

    res.status(201).json({
      message: "Categoria cadastrada com sucesso!",
      category: newCategory,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao cadastrar categoria: ${error}`,
    });
    return;
  }
};

export const putProductCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const categoryRepository = AppDataSource.getRepository(ProductCategory);
    const category = await categoryRepository.findOneBy({
      id: parseInt(id),
    });

    if (!category) {
      res.status(404).json({
        message: "Categoria não encontrada!",
      });
      return;
    }

    if (data.name && data.name !== category.name) {
      const existingCategory = await categoryRepository.findOne({
        where: { name: data.name },
      });

      if (existingCategory) {
        res.status(400).json({
          message: "Já existe outra categoria com este nome!",
        });
        return;
      }
    }

    categoryRepository.merge(category, data);
    const updatedCategory = await categoryRepository.save(category);

    res.status(200).json({
      message: "Categoria atualizada com sucesso!",
      category: updatedCategory,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao atualizar categoria: ${error}`,
    });
    return;
  }
};

export const deleteProductCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const categoryRepository = AppDataSource.getRepository(ProductCategory);
    const category = await categoryRepository.findOneBy({
      id: parseInt(id),
    });

    if (!category) {
      res.status(404).json({
        message: "Categoria não encontrada!",
      });
      return;
    }

    await categoryRepository.remove(category);

    res.status(200).json({
      message: "Categoria apagada com sucesso!",
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao apagar categoria: ${error}`,
    });
    return;
  }
};
