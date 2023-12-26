const UserSchema=require('../model/UserSchema')
const bcrypt=require('bcrypt')

const login=(req,res)=>{
    UserSchema.findOne({email:req.body.email}).then((result)=>{
        if(result==null){

            bcrypt.hash(req.body.password,10,function (err,hash) {
                if(err){
                    return res.status(500).json(err);
                }else {
                    const user=new UserSchema({
                        fullName:req.body.fullName,
                        password:hash,
                        email:req.body.email,
                        activeState:req.body.activeState
                    })
                    user.save().then((result)=>{
                        res.status(200).json({message:'user saved',data:result})
                    }).catch((er)=>{
                        res.status(500).json(er)
                    })
                }
            })

        }else {
            return res.status(409).json({'error':'already exists!'});
        }
    })
}

module.exports={
    login
}
