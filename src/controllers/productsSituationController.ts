// src/controllers/productSituationController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ProductSituation } from "../entity/productsSituation";
import { PaginationService } from "../services/paginationServices";

export const getProductSituations = async (req: Request, res: Response) => {
  try {
    const situationRepository = AppDataSource.getRepository(ProductSituation);

    // Paginação
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await PaginationService.paginate(
      situationRepository,
      page,
      limit,
      { name: "ASC" } // ordena pelo campo 'name'
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao recuperar situações de produto:", error);
    return res.status(500).json({
      error: true,
      message: `Erro ao recuperar situações de produto: ${error}`,
    });
  }
};

export const getProductSituationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const situationId = parseInt(id);

    if (isNaN(situationId)) {
      return res.status(400).json({ message: "ID inválido!" });
    }

    const situationRepository = AppDataSource.getRepository(ProductSituation);
    const situation = await situationRepository.findOne({
      where: { id: situationId },
    });

    if (!situation) {
      return res
        .status(404)
        .json({ message: "Situação de produto não encontrada!" });
    }

    res.status(200).json(situation);
  } catch (error) {
    res.status(500).json({
      message: `Erro ao buscar situação de produto: ${error}`,
    });
  }
};

export const postProductSituation = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: "O nome da situação é obrigatório!" });
    }

    const situationRepository = AppDataSource.getRepository(ProductSituation);
    const existing = await situationRepository.findOne({ where: { name } });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Já existe uma situação com este nome!" });
    }

    const newSituation = situationRepository.create({ name });
    await situationRepository.save(newSituation);

    res.status(201).json({
      message: "Situação de produto cadastrada com sucesso!",
      situation: newSituation,
    });
  } catch (error) {
    res.status(500).json({
      message: `Erro ao cadastrar situação de produto: ${error}`,
    });
  }
};

export const putProductSituation = async (req: Request, res: Response) => {
  try {
    const situationId = parseInt(req.params.id);
    if (isNaN(situationId)) {
      return res.status(400).json({ message: "ID inválido!" });
    }

    const situationRepository = AppDataSource.getRepository(ProductSituation);
    const situation = await situationRepository.findOne({
      where: { id: situationId },
    });

    if (!situation) {
      return res
        .status(404)
        .json({ message: "Situação de produto não encontrada!" });
    }

    const { name } = req.body;
    if (name && name !== situation.name) {
      const existing = await situationRepository.findOne({ where: { name } });
      if (existing) {
        return res
          .status(400)
          .json({ message: "Já existe outra situação com este nome!" });
      }
      situation.name = name;
    }

    const updated = await situationRepository.save(situation);
    res.status(200).json({
      message: "Situação de produto atualizada com sucesso!",
      situation: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: `Erro ao atualizar situação de produto: ${error}`,
    });
  }
};

export const deleteProductSituation = async (req: Request, res: Response) => {
  try {
    const situationId = parseInt(req.params.id);
    if (isNaN(situationId)) {
      return res.status(400).json({ message: "ID inválido!" });
    }

    const situationRepository = AppDataSource.getRepository(ProductSituation);
    const situation = await situationRepository.findOne({
      where: { id: situationId },
    });

    if (!situation) {
      return res
        .status(404)
        .json({ message: "Situação de produto não encontrada!" });
    }

    await situationRepository.remove(situation);
    res
      .status(200)
      .json({ message: "Situação de produto apagada com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message: `Erro ao apagar situação de produto: ${error}`,
    });
  }
};
