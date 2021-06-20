import express from 'express'
import bodyparser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRouter from "./routes/user.js";
import dotenv from 'dotenv'
const port= process.env.PORT || 5000

const app= express()
dotenv.config()
app.use(cors())
app.use('/posts',postRoutes)
app.use("/user", userRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(bodyparser.json({limit:"30mb",extended:true}))
app.use(bodyparser.urlencoded({limit:"30mb",extended:true}))

app.get('/',(req,res)=>{
  res.status(200).send("welcome to memories")
})


mongoose.connect("mongodb://localhost:27017/test",{useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false}).then(()=>{
  console.log('connection success')  
}).catch((error)=>{
    console.log(error)
})
mongoose.set('useFindAndModify', false);
app.listen(port,()=>{
    console.log("server running ")
})
