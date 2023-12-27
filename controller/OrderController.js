const OrderSchema=require('../model/OrderSchema')

const create=(req,res)=>{
    const order = new orderSchema({
        date:req.body.date,
        customerDetails:req.body.customerDetails,
        totalCost:req.body.totalCost,
        Product:req.body.Product
    });

    order.save().then(response=>{
        res.status(201).json({message:'order saved',data:response})

    }).catch(error=>{
        return res.status(500).json(error)

    })
}
const findById=(req,res)=>{
    OrderSchema.findOne({'_id':req.params.id}).then(response=>{
        if(response!=null){
            res.status(201).json({message:'product data',data:response})
        }else {
            return res.status(500).json({message:'product not found'})
        }

    }).catch(error=>{
        return res.status(500).json({message:'order not found'})

    })
}
const update=(req,res)=>{}
const deleteById=(req,res)=>{}
const findAll=(req,res)=>{}

module.exports={
    create,findById,update,deleteById,findAll
}