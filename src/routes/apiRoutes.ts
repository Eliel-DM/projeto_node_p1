import Router from "express";
import * as authController from "../controllers/authController";
import * as situationController from "../controllers/situationController";
const router = Router();

router.get("/", authController.getAuth);

router.get("/situations", situationController.getSituation);
router.get("/situations/:id", situationController.getSituationById);
router.post("/situations", situationController.postSituation);
router.put("/situations/:id", situationController.putSituation);

export default router;
