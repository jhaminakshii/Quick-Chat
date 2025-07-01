
// Signup a new user

import { generateToken } from "../lib/utils";
import User from "../models/User";

export const signup = async(req,res)=>{
    const {fullName, email, password, bio} = req.body;
    try {
       if (!fullName || !email || !password || !bio) {
        return res.json({success:false, message: 'Missing Details'})
       }
       const user = await User.findOne({email});

       if(user){
        return res.json({ success: false, message: "Account Already Exists" });
       }

       const salt = await bcrypt.genSalt(10);
       const hashedPass = await bcrypt.hash(password,salt);

       const newUser = await User.create({
        fullName,email, password: hashedPass, bio
       });

       const token = generateToken(newUser._id)
       res.json({success:true, userData:newUser,
        token, message:'Account created successfully'
       })

    } catch (error) {
        console.log(error.message)
        res.json({
          success: false,
          message:error.message
        });
    }
}

// controller to login a user

export const login = async (req,res) => {

  try {
    const {email,password} = req.body;
    const userData = await User.findOne({email})

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if(!isPasswordCorrect){
       return res.json({
          success: false,
          message:"Invalid Credentials"
        });
    }
    const token = generateToken(userData._id)
       res.json({success:true, userData,token, message:'Login successfully'})
    
  } catch (error) {
     console.log(error.message)
        res.json({
          success: false,
          message:error.message
        });
  } 
}