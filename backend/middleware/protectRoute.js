//this route is use while updating user profiel and more . it check the user is valid or not 
//if valid then it will use next function that run getMe.
import jwt from 'jsonwebtoken';
import  User from '../models/user.model.js';

export const protectRoute=async(req,res,next)=>{  //if valid it run next function that is getMe  --> router.get("/me",protectRoute,getMe);
   try {
    const token=req.cookies.jwt;
    if(!token){
        return res.status(401).json({error:"Unauthorize: No Token Provided"})
    }
    const decoded= jwt.verify(token,process.env.JWT_SECRET); //The jwt.verify method takes the token and the secret key as arguments.
   // If the token is successfully verified, decoded will contain the payload of the JWT.
    if(!decoded){
        return res.status(401).json({error:"Unauthorized: Invalid Token"});
    }
     // Find the user by ID and exclude the password field
    const user= await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(404).json({error:"User not found"})
    }

    req.user= user; //If the user is found, the user object is attached to the req object (req.user = user). This makes the user object available to subsequent middleware functions or route handlers.
                   //user object can contail all thing like username, email , followers etc. but we don't want to send password so we use select("-password") in above line.
    next();
   } catch (error) {
        console.log("Error in protectRoute middleware",error.message);
        return res.status(500).json({error:"Internal Server Error"});
   }

}
