import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../entity/situations";

export const getSituation = async (req: Request, res: Response) => {
  try {
    const situationRespository = AppDataSource.getRepository(Situation);

    //Paginação

    const page = Number(req.query.page) || 1;
    const limit = 1;
    //Contar o total de registros no banco de dados.
    const totalSituations = await situationRespository.count();
    //verificar se existem registros
    if (totalSituations === 0) {
      res.status(400).json({
        message: "Nenhua situação encontrada!",
      });
      return;
    }
    //Calcular a última página
    const lastPage = Math.ceil(totalSituations / limit);
    if (page > lastPage) {
      res.status(400).json({
        message: `Página inválida. O total de páginas é: ${lastPage}`,
      });
      return;
    }

    const offset = (page - 1) * limit;

    const situations = await situationRespository.find({
      take: limit,
      skip: offset,
      order: { id: "DESC" },
    });
    res.status(200).json({
      currentPage: page,
      lastPage,
      totalSituations,
      situations,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao recuperar Situação: ${error}`,
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
      message: `Erro ao buscar Situação: ${error}`,
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

    res.status(201).json({
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

export const putSituation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    var data = req.body;

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

    situationRespository.merge(situation, data); // Atualiza os dados.
    const updateSituation = await situationRespository.save(situation);
    res.status(200).json({
      message: "Situação atualizada com sucesso!",
      situation: updateSituation,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao atualizar Situação: ${error}`,
    });
    return;
  }
};

export const deleteSituation = async (req: Request, res: Response) => {
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
    await situationRespository.remove(situation);

    res.status(200).json({
      message: "Situação apagada  com sucesso!",
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: `Erro ao apagar Situação: ${error}`,
    });
    return;
  }
};
