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
const update= async (req,res)=>{
    const updateData= await ProductSchema.findByIdAndUpdate({'_id':req.params.id},{
        $set:{
            name:req.body.name,
            description:req.body.description,
             image:req.body.image,
            qtyOnHand:req.body.qtyOnHand,
            unitePrice:req.body.unitePrice
        }
    },{new:true});

    if(updateData){
        res.status(201).json({message:'product update'})
    }else{
        return res.status(500).json({message:'product not update'})

    }
}
const deleteById= async (req,res)=>{
    const deleteData= await ProductSchema.findByIdAndDelete({'_id':req.params.id})
    if(deleteData){
        res.status(204).json({message:'order delete'})
    }else{
        return res.status(500).json({message:'order not delete'})

    }
}
const findAll=(req,res)=>{
    try{
        const {searchText,page=1,size=1}=req.query;
        const pageNumber=parseInt(page)
        const pageSize=parseInt(size)
        const query={};
        if(searchText){
            query.$text={$search:searchText}
        }

        const skip=(pageNumber-1) * pageSize;

        const data= ProductSchema.find(query)
            .limit(pageSize)
            .skip(skip)
        res.status(200).json(data)

    }catch(error){

        return res.status(500).json(error)

    }
}


module.exports={
    create,findById,update,deleteById,findAll
}