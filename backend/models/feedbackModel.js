const mongoose=require('mongoose');
const feedbackSchema= new mongoose.Schema({
    user_id: {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
        unique:false
    },
    comment:{
        type:String,
        required:true
    },
    room_id:{
       type:mongoose.Types.ObjectId,
       ref:'Room',
       required:true
    }
},{timestamp:true,versionKey:false});
const Feedback = mongoose.model('feedbacks',feedbackSchema);
module.exports = {Feedback};