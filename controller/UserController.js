const UserSchema=require('../model/UserSchema')
const bcrypt=require('bcrypt')
const jsonWebToken=require('jsonwebtoken')
const nodeMailer=require('nodemailer')

const register=(req,res)=>{


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


                    const transporter=nodeMailer.createTransport({
                        service:'gmail',
                        auth:{
                            user:'umarmohammed20311@gmail.com',
                            pass:"zeds xhhb ttjg ncdb"

                        }
                    });

                    const mailOption={
                        from:'umarmohammed20311@gmail.com',
                        to:req.body.email,
                        subject:'New Account create',
                        text:'You Have created your account'
                    }

                    transporter.sendMail(mailOption,function (error,info){
                        if(error){
                            res.status(500).json({error:error})
                        }else {
                            user.save().then((result)=>{
                                res.status(200).json({message:'user saved',data:result,info:info.response})
                            }).catch((er)=>{
                                res.status(500).json(er)
                            })
                        }
                    })
                }
            })

        }else {
            return res.status(409).json({'error':'already exists!'});
        }
    }).catch((er)=>{
        return res.status(500).json(er);
    })
}

const login=(req,res)=>{
    UserSchema.findOne({email:req.body.email}).then((selectUser)=>{
        if(selectUser!=null){

            bcrypt.compare(req.body.password,selectUser.password, function(err, result) {

                if(result){
                    const playLoad={email:selectUser.email}
                    const secretKey=process.env.SECRET_KRY;
                    const   expiresIn='24h'

                    const token=jsonWebToken.sign(playLoad,secretKey,{expiresIn})
                    return res.status(200).json({token})

                }else {
                    res.status(401).json({message:'password incorrect'})
                }


            });

         //   return res.status(500).json({data:selectUser});

        }else {

            res.status(409).json({message:'email not found'})
        }
    }).catch((er)=>{
        return res.status(500).json(er);
    })
}

module.exports={
    register,login
}
