const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const employeeSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    
    phone:{
        type: Number,
        required: true
    },
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
employeeSchema.methods.generatetoken=async function(){
    try{
        let tokeni=jwt.sign({_id:this._id},'ddddddddd');
        this.tokens=this.tokens.concat({token:tokeni});
        await this.save();
    return tokeni
    }catch(err){
 console.log(err)
}
    
}

employeeSchema.pre('save',async function (next){
    if (this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
});

const Employee=mongoose.model('employees',employeeSchema);
module.exports=Employee;

