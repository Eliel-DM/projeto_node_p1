import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
  res.send(console.log("Hello World"));
};
