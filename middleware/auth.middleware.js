const express=require("express")
const jwt=require("jsonwebtoken")

require("dotenv").config()

const app=express()

app.use(express.json())

const auth=async(req,res,next)=>{
    try {
        const token=await req.headers.authorization.split(" ")[1]
    if(token){
        const decode=jwt.verify(token,process.env.secretKey)
        // console.log(decode)
        if(decode){
            req.body.user=decode.user
            next()
        }else{
            res.status(400).json({msg:"Something went wrong"})
        }

    }else{
        res.status(400).json({msh:"Please Login First"})
    }
    } catch (error) {
        res.status(400).json({msg:"Please Login First"})
    }
}


module.exports={auth}