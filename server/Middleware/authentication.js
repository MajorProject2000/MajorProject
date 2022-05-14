const jwt = require("jsonwebtoken");
const User = require("../models/userschema");
const Admin=require('../models/adminschema');
const Employee=require('../models/employeeschema');

const authentication = async (req,res,next) => {
    try {
    const token = req.cookies.jwtoken;
    console.log(token)
    const verifyt = jwt.verify(token, 'ddddddddd');
    const rootUser = await User.findOne({ _id: verifyt._id, "tokens.token": token });
    const rootEmployee = await Employee.findOne({ _id: verifyt._id, "tokens.token": token });
    const rootAdmin = await Admin.findOne({ _id: verifyt._id, "tokens.token": token });
    if(!rootUser && !rootEmployee && !rootAdmin){
       throw new Error("User not found");
    }
    req.token=token;
    if(rootUser){
        req.rootUser=rootUser;
        req.userId=rootUser._id;
    }
    else if(rootEmployee){
        req.rootUser=rootEmployee;
        req.userId=rootEmployee._id;
    }
    else{
        req.rootUser=rootAdmin;
        req.userId=rootAdmin._id;
    }
    next();
}
 catch (err) {
     res.send("Unauthorized user")
    console.log(err)
}}

module.exports = authentication;