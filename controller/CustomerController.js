const CustomerSchema=require('../model/Customerschema')

const create=(req,res)=>{
    console.log(req.body)
   const tempCustomer=new CustomerSchema({
        nic:req.body.nic,
        name:req.body.name,
        address:req.body.address,
        salary:req.body.salary,
    });
    tempCustomer.save().then((result)=>{
      return   res.status(200).json({message:'save customer',data:result})
    }).catch((error)=>{
        return   res.status(500).json({message:'save customer',error:error})
    })

}
const findById=(req,res)=>{
    console.log({nic:req.params.nic})
    CustomerSchema.findOne({_id:req.params.id}).then((result)=>{
        if(result!=null){
            res.status(201).json({message:'product data',data:result})
        }else {
            return res.status(500).json({message:'product not found'})
        }
    }).catch((error)=>{
        return   res.status(500).json({message:'save customer',error:error})
    })

}
const update=(req,res)=>{
    CustomerSchema.updateOne({nic:req.body.nic,},{
        $set:{
            name:req.body.name,
            address:req.body.address,
            salary:req.body.salary,
        }
    }).then((update)=>{
        if(update.modifiedCount>0){
            res.status(201).json({status:true,message:'customer update'})
        }else {
            res.status(201).json({status:false,message:'Try again'})
        }
    }).catch(error=>{
        res.status(500).json(error)
    })
}
const deleteById=(req,res)=>{
    console.log({nic:req.params.nic})
    CustomerSchema.deleteOne({nic:req.params.nic}).then(result=>{
        if(result){
            res.status(204).json({status:true,message:'customer delete'})
        }else {
            res.status(400).json({status:false,message:'Try Again'})
        }
    }).catch(error=>{
        res.status(500).json(error)
    })
}
const findAll=(req,res)=>{
    CustomerSchema.find().then(result=>{
        res.status(200).json({status:true,data:result})
    }).catch(error=>{
        res.status(500).json(error)
    })
}

module.exports={
    create,findById,update,deleteById,findAll
}