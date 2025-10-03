import Router from "express";
import * as controller from "../controllers/loginController";
const router = Router();

router.get("/all", controller.getAll);
export default router;
