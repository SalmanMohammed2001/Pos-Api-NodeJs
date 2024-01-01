const CustomerSchema=require('../model/Customerschema')
const ProductSchema = require("../model/ProductSchama");

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
    console.log({'_id':req.params.id})
    CustomerSchema.findOne({_id:req.params.id}).then((result)=>{
        if(result!=null){
           return res.status(201).json(result)
        }else {
            return res.status(500).json({message:'customer not found'})
        }
    }).catch((error)=>{
        return   res.status(500).json({message:'save customer',error:error})
    })

}
const update=(req,res)=>{

  CustomerSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            nic:req.body.nic,
            name:req.body.name,
            address:req.body.address,
            salary:req.body.salary,
        }
    },{new:true}).then((update)=>{
        if(update){
            res.status(201).json({status:true,message:'customer update'})
        }else {
            res.status(201).json({status:false,message:'Try again'})
        }
    }).catch(error=>{
        res.status(500).json(error)
    })
}
const deleteById=async (req,res)=>{
    console.log(req.param('id'))
   const  deleteData= await CustomerSchema.findByIdAndDelete({'_id':req.param('id')})
    if(deleteData){
        res.status(204).json({message:'customer delete'})
    }else{
        return res.status(500).json({message:'customer not delete'})
    }
}
const findAll=(req,res)=>{

    /*CustomerSchema.find().then(result=>{
        res.status(200).json({status:true,data:result})
    }).catch(error=>{
        res.status(500).json(error)
    })*/

    try{

        const {searchText,page=1,size=10}=req.query;
        const pageNumber=parseInt(page)
        const pageSize=parseInt(size)

        const query={};
        if(searchText){
            query.$text={$search:searchText}
        }

        const skip=(pageNumber-1) * pageSize;

        CustomerSchema.find(query)
            .limit(pageSize)
            .skip(skip).then(response=>{
            return res.status(200).json(response);
        })


    }catch(error){

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