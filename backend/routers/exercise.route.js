import express from "express"
// import {protectRoute} from "../middleware/protectRoute.js"
import {getExercisePlan,FilterExercise } from "../controllers/exercise.controller.js";

const router= express.Router();

router.get("/exercisePlan", getExercisePlan);
router.post("/FilterExercise",FilterExercise);



export default router;