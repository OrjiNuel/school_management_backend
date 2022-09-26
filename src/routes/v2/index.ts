import express from 'express';
import gradeRoutes from './grade.routes';

const router = express.Router();

router.get("/v2", (_req, res) => {
    res.send("SCHOOL MANAGEMENT API V2!");
});

router.use("/v2/grades", gradeRoutes);

export default router;