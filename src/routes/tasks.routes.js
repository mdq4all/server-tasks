import { Router } from "express";
import * as taskController from "../controllers/task.controllers";

const router = Router();

router.post("/", taskController.createTask);

router.get("/", taskController.findAllTasks);

router.get("/done", taskController.findAllTasksDone);

router.get("/:id", taskController.findOneTask);

router.delete("/:id", taskController.deleteTask);

router.put("/:id", taskController.updateTask);

export default router;
