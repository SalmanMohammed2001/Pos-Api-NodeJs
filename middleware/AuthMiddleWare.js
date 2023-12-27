const jsonWebToken=require('jsonwebtoken')
const secretKey=process.env.SECRET_KRY

const verifyToken=(req,res,next)=>{
    const authorizationHeader= req.headers.authorization;

    if(!authorizationHeader){
        return res.status(401).json({error:'no token provided'})
    }

    if(!authorizationHeader.startsWith('Bearer ')){
        return res.status(401).json({error:'invalid token format'})
    }


    const token=authorizationHeader.slice(7)
    if(!token){
        return res.status(401).json({error:'invalid token '})

    }

    try{

        const decodedData=jsonWebToken.verify(token,process.env.SECRET_KEY)

        next();

    }catch(error){
        return res.status(401).json({error:'invalid token'})
    }
}

module.exports=verifyToken