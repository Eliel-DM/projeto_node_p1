import { Request, Response } from "express";
import { AppDataSource } from "../data-source";

export const getAll = async (req: Request, res: Response) => {
  res.send("Teste01");
};

//Iniciar conexão com banco de dados;
AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com banco de dados realizada com sucesso");
  })
  .catch((error) => {
    console.log(`Erro na conexão com o banco de dados: ${error} !`);
  });
