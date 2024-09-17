import express from "express"
import {protectRoute} from "../middleware/protectRoute.js"
import {getExercises,FilterExercise } from "../controllers/exercise.controller.js";

const router= express.Router();

router.get("/allExercise",getExercises);
router.post("/FilterExercise",FilterExercise);



export default router;