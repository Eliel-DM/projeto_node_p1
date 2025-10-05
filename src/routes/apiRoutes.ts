import Router from "express";
import * as authController from "../controllers/authController";
import * as situationController from "../controllers/situationController";
import * as productsController from "../controllers/productsController";
import * as productsCategoriesController from "../controllers/productsCategoriesController";
import * as productsSituationsController from "../controllers/productsSituationController";
const router = Router();
//Auth Routes
router.get("/", authController.getAuth);

//Situation Routes
router.get("/situations", situationController.getSituation);
router.get("/situations/:id", situationController.getSituationById);
router.post("/situations", situationController.postSituation);
router.put("/situations/:id", situationController.putSituation);
router.delete("/situations/:id", situationController.deleteSituation);

//Products Routes

router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.getProductById);
router.post("/products", productsController.postProduct);
router.put("/products/:id", productsController.putProduct);
router.delete("/products/:id", productsController.deleteProduct);

//ProductsCategories Routes

router.get(
  "/productsCategories",
  productsCategoriesController.getProductCategories
);
router.get(
  "/productsCategories/:id",
  productsCategoriesController.getProductCategoryById
);
router.post(
  "/productsCategories",
  productsCategoriesController.postProductCategory
);
router.put(
  "/productsCategories/:id",
  productsCategoriesController.putProductCategory
);
router.delete(
  "/productsCategories/:id",
  productsCategoriesController.deleteProductCategory
);

//ProductsSituation Routes

router.get(
  "/productSituation",
  productsSituationsController.getProductSituations
);
router.get(
  "/productSituation/:id",
  productsSituationsController.getProductSituationById
);
router.post(
  "/productSituation",
  productsSituationsController.postProductSituation
);
router.put(
  "/productSituation/:id",
  productsSituationsController.putProductSituation
);
router.delete(
  "/productSituation/:id",
  productsSituationsController.deleteProductSituation
);

export default router;
