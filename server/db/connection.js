const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://majorproject:majorproject@cluster0.wsb9g.mongodb.net/majorproject1?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log(`connected`);
}).catch((err)=>{
    console.log(err);
});