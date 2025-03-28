import express from "express";
import { getAllTodos, addTodo, updateTodo, deleteTodo, deleteMultiple } from "../controller/TodoController";
import isAuthenticated from '../middleware/auth'; // Import the isAuthenticated middleware
const taskrouter = express.Router();

// Ensure all routes use isAuthenticated middleware
taskrouter.use(isAuthenticated);

// Define routes
//@ts-expect-error
taskrouter.route('/').get(getAllTodos);
//@ts-expect-error
taskrouter.route('/').post(addTodo);
//@ts-expect-error
taskrouter.route('/').delete(deleteMultiple);
//@ts-expect-error
taskrouter.route('/:id').patch(updateTodo);
//@ts-expect-error
taskrouter.route('/:id').delete(deleteTodo);

export default taskrouter;
