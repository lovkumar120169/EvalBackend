const express=require("express")
const {PostModel}=require("../models/post.model")


const postRoutes=express.Router();

postRoutes.post("/add",async(req,res)=>{
    try {
        console.log(req.body)
        const post=new PostModel({...req.body})
        await post.save()
        res.status(200).json({msg:"Post added Successfully",post})
    } catch (error) {
        res.status(400).json({error})
    }
})
postRoutes.get("/",async(req,res)=>{
    let {pageNo}=req.query
    // console.log(req.userID)
    try {
        const post=await PostModel.find({user:req.user}).skip((pageNo-1)*3).limit(3)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error})
    }
})
postRoutes.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const post=await PostModel.findOneAndDelete({_id:id})
        res.status(200).json({msg:"Post successfully Deleted"})
    } catch (error) {
        res.status(400).json({error})
    }
})
postRoutes.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const post=await PostModel.findOneAndUpdate({_id:id},req.body)
        res.status(200).json({msg:"Post Updated Successfully"})
    } catch (error) {
        res.status(400).json({error})
    }
})
postRoutes.get("/top",async(req,res)=>{
    let {pageNo}=req.query
    try {
        const top=await PostModel.find().sort({no_of_comments: -1}).skip((pageNo-1)*3).limit(3)
        res.status(200).json({top})
    } catch (error) {
        res.status(400).json({error})
    }
})










module.exports={postRoutes}






