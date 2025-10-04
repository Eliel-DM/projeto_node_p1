import Router from "express";
import * as authController from "../controllers/authController";
import * as situationController from "../controllers/situationController";
const router = Router();
//Auth Routes
router.get("/", authController.getAuth);

//Situation Routes
router.get("/situations", situationController.getSituation);
router.get("/situations/:id", situationController.getSituationById);
router.post("/situations", situationController.postSituation);
router.put("/situations/:id", situationController.putSituation);
router.delete("/situations/:id", situationController.deleteSituation);

export default router;
