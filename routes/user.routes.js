const express=require("express")
const {UserModel}=require("../models/user.model")
const userRouter=express.Router();
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { PostModel } = require("../models/post.model");
require("dotenv").config()

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    const user= await UserModel.find({email:email});
    if(user.length>=1){
        res.status(200).json({msg:"User Already Registerd Please Login"})
    }else{
        try {
            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err){
                    res.status(400).json({err:"something went wrong"})
                }else{
                    const newUser=new UserModel({...req.body,password:hash})
                    await newUser.save()
                    res.status(200).json({msg:"User Registerd Successfully"})
                }
            });

        } catch (error) {
            res.status(400).json({err:"Something went wrong"})
        }

    }

    

})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.find({email:email})
        if(user.length>=1){
            bcrypt.compare(password, user[0].password,(err, result)=> {
                if(result){
                   const token= jwt.sign({userID: user[0]._id}, process.env.secretKey, { expiresIn: "7d" });
                    res.status(200).json({msg:"Login Successfull",token})
                }else{
                    res.status(400).json({msg:"Something went wrong"})
                }
            });
        }
    } catch (error) {
        res.status(400).json({err:error})
    }
})

module.exports={userRouter}

