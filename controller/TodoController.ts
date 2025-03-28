import { Request, Response } from "express"
import TodoModel from "../models/Todo";

interface AuthRequest extends Request {
    user?: {
        userId: string;
        username: string;
    };
}

const addTodo = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const todo = await TodoModel.create({
            description: req.body.description,
            completed: req.body.completed,
            priority: req.body.priority,
            tags: req.body.tags,
            userId: req.user.userId
        });
        
        res.status(201).json({
            "message": "todo added"
        });
    } catch (err) {
        console.error("Error adding todo:", err);
        res.status(500).json({
            "message": "error while adding todo"
        });
    }
};

const updateTodo = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const todo = await TodoModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            {
                description: req.body.description,
                completed: req.body.completed,
                priority: req.body.priority,
                tags: req.body.tags
            },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        res.status(200).json({
            message: "todo updated",
            todo
        });
    } catch (err) {
        console.error("Error updating todo:", err);
        res.status(500).json({
            "message": "error while updating todo"
        });
    }
};

const getAllTodos = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        const todos = await TodoModel.find({ userId: req.user.userId });
        res.status(200).json({
            "message": "todos fetched",
            "todos": todos
        });
    } catch (err) {
        console.error("Error fetching todos:", err);
        res.status(500).json({
            "message": "error while fetching todos"
        });
    }
};

const deleteTodo = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const todo = await TodoModel.findOneAndDelete({ 
            _id: req.params.id,
            userId: req.user.userId 
        });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        res.status(200).json({
            "message": "todo deleted"
        });
    } catch (err) {
        console.error("Error deleting todo:", err);
        res.status(500).json({
            "message": "error while deleting todo"
        });
    }
};

const deleteMultiple = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const todo = await TodoModel.deleteMany({
            _id: { $in: req.body.ids },
            userId: req.user.userId
        });

        res.status(200).json({
            "message": "todos deleted"
        });
    } catch (err) {
        console.error("Error deleting todos:", err);
        res.status(500).json({
            "message": "error while deleting todos"
        });
    }
};

export  {addTodo,updateTodo,getAllTodos,deleteTodo, deleteMultiple};
