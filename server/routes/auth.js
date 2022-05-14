const express=require('express');
const router=express.Router();
router.use(express.json());
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = require('../models/userschema');
const admin=require('../models/adminschema');
const employee=require('../models/employeeschema');
const order=require('../models/orderschema')
const authentication =require("../Middleware/authentication")

const cookieParser =require("cookie-parser");
router.use(cookieParser())

router.post('/signUpUser', async (req, res) => {
    console.log(req.body);
    const { name, phone, email, password, cpassword } = req.body;
    if(!name || !phone || !email || !password || !cpassword ){
        return res.status(422).json({error:"Please fill the fields properly"})
    }
    if(password!=cpassword){
        return res.status(422).json({error:"Password and Confirm Password does not match!!"})
    }
    try {

        const userlogin = await user.findOne({ email });
        if (userlogin) {
            console.log('already exist')
            return;
            res.status(201);
        }
        else {
            const userr = new user({ name:name, phone:phone, email, password, cpassword })
            await userr.save();
            res.json({ message: "login" });
            res.status(201);
        }



    } catch (err) {
        console.log(err)
    }

});
router.post('/loginUser', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    
    if( !email || !password ){
        return res.status(422).json({error:"Please fill the fields properly"})
    }

    try {

        const userlogin = await user.findOne({ email });console.log(userlogin);
        const isMatch = await bcrypt.compare(password, userlogin.password);
        if (userlogin) {
            
            if (isMatch) {
                const token =await userlogin.generatetoken();
                console.log(token);
                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+543333333333),
                    httpOnly:true
                })
                res.json({ message: "login" })
            }
            else{
                console.log("Not match password")
            }
        }
        else {

            res.status(201);
        }
    } catch (err) {
        console.log(err)
    }
});
    

router.post('/signUpEmployee', async (req, res) => {
    console.log(req.body);
    const { name, phone, email, password, cpassword } = req.body;
    if(!name || !phone || !email || !password || !cpassword ){
        return res.status(422).json({error:"Please fill the fields properly"})
    }
    if(password!=cpassword){
        return res.status(422).json({error:"Password and Confirm Password does not match!!"})
    }
    try {

        const employeelogin = await employee.findOne({ email });
        if (employeelogin) {
            console.log('already exist')
            return;
            res.status(201);
        }
        else {
            const employeee = new employee({ name, phone, email, password, cpassword })
            await employeee.save();
            res.json({ message: "login as user" });
            res.status(201);
        }

    } catch (err) {
        console.log(err)
    }

});
router.post('/loginEmployee', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    
    if( !email || !password ){
        return res.status(422).json({error:"Please fill the fields properly"})
    }

    try {
        const employeelogin = await employee.findOne({ email });console.log(employeelogin);
        const isMatch = await bcrypt.compare(password, userlogin.password);
        if (employeelogin) {
            
            if (isMatch) {
                const token =await employeelogin.generatetoken();
                console.log(token);
                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+543333333333),
                    httpOnly:true
                })
                res.json({ message: "login as employee" })
            }
            else{
                console.log("Not match password")
            }
        }
        else {

            res.status(201);
        }
    } catch (err) {
        console.log(err)
    }
});

router.post('/loginAdmin', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    
    if( !email || !password ){
        return res.status(422).json({error:"Please fill the fields properly"})
    }

    try {
        const adminlogin = await admin.findOne({ email });console.log(adminlogin);
        if (adminlogin) {
            
            if (adminlogin.password === password) {
                const token =await adminlogin.generatetoken();
                console.log(token);
                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+543333333333),
                    httpOnly:true
                })
                res.json({ message: "login as admin" })
            }
            else{
                console.log("Not match password")
            }
        }
        else {

            res.status(201);
        }
    } catch (err) {
        console.log(err)
    }
});

router.get('/logout',(req,res)=>{
    console.log("logout");
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User logout');
});
router.post('/book',(req,res)=>{
    const newOrder=new order({
        name:req.body.name,
        serviceType:req.body.serviceType,
        price:req.body.price,
        address:req.body.address,
        phone:req.body.phone,
        professionalName:req.body.professionalName
    })
    newOrder.save().then(()=>{
        res.status(201).json({msg:"Order Placed Successfully"})
    })
    .catch((error)=>{
        res.status(400).json({error:error})
    })
})
router.get('/buy',authentication,(req,res)=>{
    console.log("buy");
    res.send(req.rootUser)
});

module.exports = router;
