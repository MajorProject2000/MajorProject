const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true
    },  
    password:{
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required:true
        }
    }]
})
adminSchema.methods.generatetoken=async function(){
    try{
        let tokeni=jwt.sign({_id:this._id},'ddddddddd');
        this.tokens=this.tokens.concat({token:tokeni});
        await this.save();
    return tokeni
    }catch(err){
 console.log(err)
}
    
}

const Admin=mongoose.model('admin',adminSchema);
module.exports=Admin;

