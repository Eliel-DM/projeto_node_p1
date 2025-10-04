import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../entity/situations";

export const getSituation = async (req: Request, res: Response) => {
  res.send("RotaSituations");
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
  } catch (error) {
    res.status(500).json({
      message: `Erro ao cadastrar situação: ${error}`,
    });
  }
};
