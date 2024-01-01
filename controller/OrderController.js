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
const update= async (req,res)=>{

    const updateData= await OrderSchema.findByIdAndUpdate({'_id':req.params.id},{
        $set:{
            date:req.body.date,
            customerDetails:req.body.customerDetails,
            totalCost:req.body.totalCost,
            Product:req.body.Product
        }
    },{new:true});

    if(updateData){
        res.status(201).json({message:'order update'})
    }else{
        return res.status(500).json({message:'order not update'})

    }
}
const deleteById= async (req,res)=>{
    const deleteData= await OrderSchema.findByIdAndDelete({'_id':req.params.id})
    if(deleteData){
        res.status(204).json({message:'order delete'})
    }else{
        return res.status(500).json({message:'order not delete'})

    }
}
const findAll=(req,res)=>{
    try {

        const {searchText, page = 1, size = 10} = req.query;
        const pageNumber = parseInt(page)
        const pageSize = parseInt(size)

        const query = {};
        if (searchText) {
            query.$text = {$search: searchText}
        }

        const skip = (pageNumber - 1) * pageSize;

        OrderSchema.find(query)
            .limit(pageSize)
            .skip(skip).then(response => {
            return res.status(200).json(response);
        })


    } catch (error) {

        return res.status(500).json(error)

    }

}

const findAllCount = (req, res) => {
    try {
        CustomerSchema.countDocuments().then(data => {
            return res.status(200).json(data);
        })
    } catch (error) {

        return res.status(500).json(error)
    }

}


module.exports={
    create,findById,update,deleteById,findAll,findAllCount
}