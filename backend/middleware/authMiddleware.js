// routerlevel middleware ante only particular middleware ke work avuthundhi
const User=require("../models/User");

const authMiddleware=async(req,res,next)=>{
    try{
        const userId=req.headers.userid;
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"User ID Missing"
            })
        }
        const user=await User.findById(userId);
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid User ID"
            })
        }
        req.user=user;
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Authentication Error"
        });
    }
}

module.exports=authMiddleware;