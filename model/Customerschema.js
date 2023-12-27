const mongoose=require('mongoose')

const CustomerSchema=new mongoose.Schema({
    nic:{type:String,require:true,unique:true},
    name:{type:String,require:true},
    address:{type:String,require:true},
    salary:{type:Number,require:true},
})
module.exports=mongoose.model('customer',CustomerSchema)