const mongoose=require('mongoose')
const express=require('express')
require('dotenv').config()
const app=express()
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port=process.env.SERVER_PORT | 3000

mongoose.connect('mongodb://127.0.0.1:27017/pos_crud').then(()=>{
    app.listen(port,()=>{
        console.log(`server port running ${port}`)
    })
})

