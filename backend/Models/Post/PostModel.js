import mongoose from "mongoose";

const Post = new mongoose.Schema({
    done:{type:Boolean},
    title:{type:String,required:true}
})

export default mongoose.model('Post', Post)