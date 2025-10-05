import "reflect-metadata";
import { DataSource } from "typeorm";
import { Situation } from "./entity/situations";
import { User } from "./entity/users";
import { Product } from "./entity/products";
import { ProductCategory } from "./entity/productsCategories";
import { ProductSituation } from "./entity/productsSituation";

import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [Situation, User, Product, ProductCategory, ProductSituation],
  subscribers: [],
  migrations: [__dirname + "/migration/*.js"],
});
