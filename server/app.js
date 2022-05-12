const express=require('express');
const app=express();
require("./db/connection")

app.use(require('./routes/auth'))


app.listen(3800,()=>{
    console.log(`running at port 3800`);
})  