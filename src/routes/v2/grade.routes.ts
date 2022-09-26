import express from 'express';
import { createGradeSchema, updateGradeSchema } from '../../types/Grade';
import { createGrade, deleteGrade, getAllGrades, getGrade, updateGrade } from '../../controllers/grade/Grade.Controller';
import validateResource from '../../middlewares/ValidateResource';

const router = express.Router();

router.get("/", getAllGrades);

router.get("/:id", getGrade);

router.post("/", validateResource(createGradeSchema), createGrade);

router.put("/:id", validateResource(updateGradeSchema), updateGrade);

router.delete("/:id", deleteGrade);

export default router;