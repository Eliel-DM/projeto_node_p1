import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../entity/situations";

export const getSituation = async (req: Request, res: Response) => {
  try {
    const situationRespository = AppDataSource.getRepository(Situation);
    const situations = await situationRespository.find();
    res.status(200).json(situations);
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao recuperar dados: ${error}`,
    });
    return;
  }
};

export const getSituationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const situationRespository = AppDataSource.getRepository(Situation);
    const situation = await situationRespository.findOneBy({
      id: parseInt(id),
    });

    if (!situation) {
      res.status(404).json({
        message: "Situação não encontrada!",
      });
      return;
    }

    res.status(200).json(situation);
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao recuperar Situação: ${error}`,
    });
    return;
  }
};

export const postSituation = async (req: Request, res: Response) => {
  try {
    var data = req.body;
    const situationRespository = AppDataSource.getRepository(Situation);
    const newSituation = situationRespository.create(data);
    await situationRespository.save(newSituation);

    res.status(200).json({
      message: "Situação cadastrada com sucesso!",
      situation: newSituation,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao cadastrar situação: ${error}`,
    });
    return;
  }
};
