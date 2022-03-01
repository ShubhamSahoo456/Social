const express = require('express');
const helmet = require('helmet');
const morgon = require('morgan');
const dotenv = require('dotenv');
const authRoute = require('./routes/authRoutes');
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const conversationRoute = require("./routes/conversationoutes");
const messageRoute = require("./routes/messageRoutes");


dotenv.config({path:"./config.env"})
require("./db/config")
const app = express();
app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Headers", "userid");
    res.set("Access-Control-Allow-Credentials", true);
    next();
  });


app.use(express.json())
app.use(helmet())
app.use(morgon('combined'))
app.use("/api/v1",authRoute)
app.use("/api/v1",userRoute)
app.use("/api/v1",postRoute)
app.use("/api/v1/",conversationRoute)
app.use("/api/v1",messageRoute)

app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT + " is running")
})