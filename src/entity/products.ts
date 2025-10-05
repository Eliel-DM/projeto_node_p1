// src/entity/products.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ProductSituation } from "./productsSituation";
import { ProductCategory } from "./productsCategories";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => ProductSituation, (situation) => situation.products, {
    nullable: false,
  })
  @JoinColumn({ name: "productSituationId" })
  productSituation!: ProductSituation;

  @ManyToOne(() => ProductCategory, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: "productCategoryId" })
  productCategory!: ProductCategory;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
}
