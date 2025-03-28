import mongoose from "mongoose"
import { Schema } from "mongoose"
const userSchema = new Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    }
})
const UserModel = mongoose.model('User', userSchema);
export default UserModel;