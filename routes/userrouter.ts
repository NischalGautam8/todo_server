import { register,login } from "../controller/UserController";
import express from "express"
const userrouter = express.Router()
userrouter.route('/register').post(register);
userrouter.route('/login').post(login);
export default userrouter