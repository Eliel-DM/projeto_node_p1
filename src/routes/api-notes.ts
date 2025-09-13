import Router from "express";
import * as controller from "../controllers/api-controller";
const router = Router();

router.get("/all", controller.getAll);
export default router;
