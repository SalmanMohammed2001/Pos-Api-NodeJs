const mongoose=require('mongoose')

const OrderSchema=new mongoose.Schema({
    date:{type:Date,require:true},
    customer:{type:Object,require:true},
    totalCost:{type:Number,require:true},
    Product:{type:Array,require:true},
})

module.exports=mongoose.model('customer',OrderSchema)