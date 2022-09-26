import express from "express";
import v2 from "./v2";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Welcome to SCHOOL MANAGEMENT REST API SERVICE!!!");
});

router.use(v2);

export default router;