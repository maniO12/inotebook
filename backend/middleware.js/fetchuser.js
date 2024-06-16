import jwt from 'jsonwebtoken';
const JWT_SECRET = 'Thisissecretwebtokn'; 

const fetchuser =(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please enter the valid credentials"});
    }
    try{
         const data = jwt.verify(token,JWT_SECRET);
         req.user = data.user;
         next();

    }
    catch(error){
   return res.status(401).send({error:"internal server error"});
    }
}

export default fetchuser;