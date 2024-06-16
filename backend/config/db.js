const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/RoomMate',{
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