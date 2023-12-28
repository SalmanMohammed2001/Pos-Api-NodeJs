const mongoose=require('mongoose')
const express=require('express')
require('dotenv').config()
const cors = require('cors')
const app=express()
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const port=process.env.SERVER_PORT | 3000


const UserRouter=require('./router/UserRouter')
const CustomerRouter=require('./router/customerRoute')
const ProductRouter=require('./router/ProductRoute')
const OrderRouter=require('./router/OrderRoute')

mongoose.connect('mongodb://127.0.0.1:27017/pos_crud').then(()=>{
    app.listen(port,()=>{
        console.log(`server port running ${port}`)
    })
})



app.use("/api/v1/users",UserRouter)
app.use("/api/v1/customers",CustomerRouter)
app.use("/api/v1/products",ProductRouter)
app.use("/api/v1/orders",OrderRouter)



