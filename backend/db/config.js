const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connection successful')
}).catch((err)=>{
    console.log(err)
})