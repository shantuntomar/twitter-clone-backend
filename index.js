const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

const DB = "mongodb+srv://shantun:shantun@cluster0.kgv2g2l.mongodb.net/socialapp?retryWrites=true&w=majority"

mongoose.connect(DB , {
    useNewUrlParser : true ,
    UseUnifiedTopology : true,
}).then(() => {
    console.log("connection done");
}).catch((err) => {
    console.log(err);
})

//middleware 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use('/api/users' , userRoute);
app.use('/api/auth' , authRoute);
app.use('/api/posts' , postRoute);

//routers 
app.get('/' , (req , res) => {
    res.send("hello");
})



app.listen(4000 , () => {
    console.log("server start");
});