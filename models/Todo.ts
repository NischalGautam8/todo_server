import mongoose, { Schema } from "mongoose";
const todoSchema = new Schema({
    description:{
        type:String
    },
    completed:{
        type:Boolean,
        default:false
    },
    priority:{
        type:Number,
        default:0///no priority 0 white border , 1 green 2 yellow 3 red
    },
    userId:{type:Schema.Types.ObjectId,ref:"User"},
    tags:[{type:String}]
})
const TodoModel = mongoose.model('Todo', todoSchema);
export default TodoModel;
