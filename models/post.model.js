const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    user:String,
    no_of_comments:Number,
},{
    versionKey:false
})


const PostModel=mongoose.model("posts",postSchema)


module.exports={PostModel}