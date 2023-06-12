const express=require("express")
const {connection}=require("./db")
require("dotenv").config()
const cors=require("cors")
const {userRouter}=require("./routes/user.routes")
const {postRoutes}=require("./routes/post.routes")
const {auth}=require("./middleware/auth.middleware")



const app=express()
app.use(express.json())

app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRoutes)




app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("DB is Connected")
        console.log(`DB is running on Port No ${process.env.port}`)
        
    } catch (error) {
        console.log("Something went wrong in Database")
        console.log(error)
    }
})

// {
//     "title":"learn React",
//     "body":"In 15 days",
//     "device":"Mobile",
//     "no_of_comments":20
// }