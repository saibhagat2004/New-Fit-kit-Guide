import express from "express"
// import {protectRoute} from "../middleware/protectRoute.js"
import {getExercisePlan,FilterExercise,getAllExercises,storeUserActivity,getUserActivities } from "../controllers/exercise.controller.js";

const router= express.Router();

router.get("/exercisePlan", getExercisePlan);
router.post("/FilterExercise",FilterExercise);
router.get("/allExercise",getAllExercises )
router.post("/storeActivity/:id",storeUserActivity)
router.get('/getUserActivities/:id', getUserActivities);



export default router;