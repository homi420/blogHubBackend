const express  = require("express")
const router = express.Router();
const ev = require("express-validator")
const JWT_SECRET = "1WDCFT6YHNMKO012345QWERASDFZXCV"
// Importing userSchema
const Users= require("../models/Users")
/* -+-+--+-+-+-+-+-+-+-+-+----------------+-+-+-+--+-+-+-+-+-+ */

// Importing all the functions here...

// Authentication Functions Here...
const createUser = require("./subAuth/createUser");
const login = require("./subAuth/login");
const getUser = require("./subAuth/getUser")

// Middleware Function
const fetch = require("../middleware/fetch")
/* -+-+--+-+-+-+-+-+-+-+-+----------------+-+-+-+--+-+-+-+-+-+ */



// All the endpoints here...

//   /api/auth/createUser
router.post("/createUser",[ev.body("email","The Email You Entered Is Not Valid...").isEmail(),ev.body("name","The name's length should not be less than 3...").isLength({min:3}),ev.body("password","Password's length can not be less than 8...").isLength({min:8})],(req,res)=>{
    const errors = ev.validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({success:false,error:errors.array()[0].msg})
    }
    else{
        try{
            createUser(req,res,Users);
        }
        catch(error){
            res.status(500).json({success:false,error:error})
        }
    }

});
//   /api/auth/login
router.post("/login",[ev.body("email","The Email You Entered Is Not Valid").isEmail(),ev.body("password","Password's length can not be less than 8...").isLength({min:8})],(req,res)=>{
    const errors = ev.validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({success:false,error:errors.array()[0].msg})
    }
    else{
        try{
            login(req,res,Users,JWT_SECRET)
        }
        catch(error){
            res.status(500).json({success:false,error:error})
        }
    }
})

//   /api/auth/getUser   || Login Required  ||
router.get("/getUser",fetch,(req,res)=>{
try{
    getUser(req,res,Users)
}
catch(error){
    res.status(500).json({success:false,error:error})
    
}
})
module.exports = router;