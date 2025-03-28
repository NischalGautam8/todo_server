import UserModel from "../models/User";
import jwt from "jsonwebtoken"
import { Request,Response,RequestHandler } from "express";
const register:any=async (req:Request,res:Response)=>{
    try{
        if(!req.body.username || !req.body.password){
            return res.status(400).json({message:"username and password are required"})
        }
        const existingUser = await UserModel.findOne({username:req.body.username})

        if(existingUser){
            return res.status(400).json({message:"user already exists"})
        }
        const user = await UserModel.create({
            username:req.body.username,
            password:req.body.password
        })
        return res.status(201).json({message:"user created"})
    }catch(err){
        console.log("error while registering",err)
    }
}
const login:any= async (req:Request,res:Response)=>{
    try{
        if(!req.body.username || !req.body.password){
            return res.status(400).json({message:"username and password are required"})
        }
        const user = await UserModel.findOne({username:req.body.username})
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        if(user.password !== req.body.password){
            return res.status(400).json({message:"password is incorrect"})
        }
        // sign jwt with key
        return res.status(200).json({message:"user logged in",jwt: jwt.sign({userId:user._id,username:user.username},process.env.jwt_secret || "1234567890")})
    }catch(err){
        console.log("error while logging in",err)
    }
}

export  {register,login}