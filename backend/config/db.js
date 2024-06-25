const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connected to Mongodb');
}catch(error){
    console.error('Error connection to mongoDB:',error.message);
    process.exit(1);
}
};

module.exports = {connectDB};