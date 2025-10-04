import Router from "express";
import * as authController from "../controllers/authController";
import * as situationController from "../controllers/situationController";
const router = Router();

router.get("/", authController.getAuth);

router.get("/situations", situationController.getSituation);
router.post("/situations", situationController.postSituation);

export default router;
