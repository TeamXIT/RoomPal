const mongoose=require('mongoose');
const ratingSchema = new mongoose.Schema({
    user_id: {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
        unique:false
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        validate:{
         validator:function(value){
           return !isNaN(value) && parseFloat(value)== value;
         },
         message:props=>`${props.value} is not a float value`
        },
        required:true
    },
    room_id:{
       type:mongoose.Types.ObjectId,
       ref:'Room',
       required:true
    }
 },{timestamp:true,versionKey:false},);
 const Rating = mongoose.model('ratings',ratingSchema);
 module.exports = {Rating};