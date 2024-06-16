import { Router } from 'express';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fetchuser from '../middleware.js/fetchUser.js';
const router = Router();

const JWT_SECRET = 'Thisissecretwebtokn'; 

 // SignIN /api/auth/createUser

router.post(
  '/createUser',
  [
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  try{

      let user = await  User.findOne({email: req.body.email});
      if(user){
          return   res.status(500).send('User with this Email already exists'); 
}
 const salt = await bcrypt.genSalt(10);
 const secPass = await bcrypt.hash(req.body.password,salt);
    
       user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

    const data = {
      user:{
              id:user.id
      }
    }  
  const authtoken = jwt.sign(data,JWT_SECRET);
      res.json({authtoken,status:true});

    } catch (error) {
      console.error('Error creating user:', error); 
      res.status(500).send('Some error occurred');
    }
  }
);

export default router;

//LogIN /api/auth/login

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log(email + " " + password);
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success= false;
      return res.status(400).json({success,error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success= false;
      return res.status(400).json({success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken,status:true});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//GetUser api/auth/getUser

router.post('/getUser',fetchuser,async(req,res)=>{

try{
      const id = req.user.id;
      const user = await User.findById(id).select("-password");
      if (!user) {
        return res.status(404).send({ error: "User not found" });
    }
      res.send(user);
}
catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server Error");   
}
});


