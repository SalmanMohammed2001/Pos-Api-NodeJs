const ProductSchema=require('../model/ProductSchama')

const create=(req,res)=>{
    const product =new productSchema({
        name:req.body.name,
        description:req.body.description,
        image:req.body.image,
        qtyOnHand:req.body.qtyOnHand,
        unitePrice:req.body.unitePrice
    });

    product.save().then(response=>{
        res.status(201).json({message:'product',data:response})

    }).catch(error=>{
        return res.status(500).json(error)

    })
}
const findById=(req,res)=>{
    ProductSchema.findOne({'_id':req.params.id}).then(response=>{
        if(response!=null){
            res.status(201).json({message:'product data',data:response})
        }else {
            return res.status(500).json({message:'product not found'})
        }

    }).catch(error=>{
        return res.status(500).json({message:'product not found'})

    })

}
const update=(req,res)=>{

}
const deleteById=(req,res)=>{

}
const findAll=(req,res)=>{

}

module.exports={
    create,findById,update,deleteById,findAll
}