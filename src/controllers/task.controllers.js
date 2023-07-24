import Task from "../models/Task";
import { getPagination } from "../libs/getPagination";

export const findAllTasks = async (req, res) => {
    try {
        const { size, page, title } = req.query;
        const condition = title ? {
            title: { $regex: new RegExp(title), $options: "i" }
        } : {};

        const { limit, offset } = getPagination(page, size);
        const data = await Task.paginate(condition, { offset, limit });
        res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong retrieving tasks",
        });
    }
};

export const createTask = async (req, res) => {
    if (!req.body.title)
        return res.status(400).send({ message: "the title is required" });
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            done: req.body.done ? req.body.done : false,
        });
        const taskSaved = await newTask.save();
        res.json(taskSaved);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong creating tasks",
        });
    }
};

export const findOneTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong retrieving one task",
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.json({
            message: `${task.title} Task was delete succesfully`,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong deleting task",
        });
    }
};

export const findAllTasksDone = async (req, res) => {
    try {
        const tasks = await Task.find({ done: true });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong finding all tasks done",
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body);
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong updating task",
        });
    }
};
