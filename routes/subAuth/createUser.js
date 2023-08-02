const bcrypt = require("bcryptjs")
const createUser = async(req,res,Users)=>{
    const {email,password,name}=req.body;
    let user = await Users.findOne({email:email})
    if(user){
        res.status(400).json({success:false,error:"User with this email already exists..."});
    }
    else{
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(password,salt)

        user =await Users.create({
            name:name,
            email:email,
            password:secPass
        })
       

        res.json({success:true,msg:"You have successfully signed up!"})
    }

}
module.exports = createUser