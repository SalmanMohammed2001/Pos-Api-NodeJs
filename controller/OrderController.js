const OrderSchema=require('../model/OrderSchema')
const ProductSchema = require('../model/ProductSchama')

const create=(req,res)=>{
    // console.log(req.body)
  const order = new OrderSchema({
        date:req.body.date,
        customerDetails:req.body.customerDetails,
        totalCost:req.body.totalCost,
        Product:req.body.Product
    });

    order.save().then(response=>{
        response.Product.forEach(product=>{
            ProductSchema.findOne({'_id':product._id}).then((data)=>{

                 const  setQty=data.qtyOnHand-product.qty

                ProductSchema.updateOne({'_id':product._id},{
                    $set:{
                        name: product.name,
                        description: product.description,
                   //     image: req.file.path,
                        qtyOnHand: setQty,
                        unitePrice: product.unitePrice
                    }
                }).then((update)=>{
                    if(update.modifiedCount>0){
                        console.log('update')
                    }else {
                        console.log('error')
                    }
                }).catch((error)=>{
                    res.status(400).json(error)
                })

            }).catch((error)=>{
                res.status(400).json(error)
            })

        })
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
        OrderSchema.countDocuments().then(data => {
            return res.status(200).json(data);
        })
    } catch (error) {

        return res.status(500).json(error)
    }

}

const findAllIncome = async (req, res) => {

    try{
        const result = await OrderSchema.aggregate([
            {$group:{
                    _id:null,
                    totalCostSum:{$sum:'$totalCost'}
                }}
        ]);
      //  console.log(result);
        const totalCostSum= result.length>0?result[0].totalCostSum:0;
        res.json({totalCostSum});
    }catch (error){
        return res.status(500).json({'message':'internal server error'});
    }

}

module.exports={
    create,findById,update,deleteById,findAll,findAllCount,findAllIncome
}