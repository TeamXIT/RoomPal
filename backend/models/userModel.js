const mongoose = require('mongoose');
const { type } = require('os');
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        required:false,
        default:'',
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    mobileNumber:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    dateOfBirth:{
        type:Date,
        required:true,
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true,
        trim:true,
    },
    lookingForRoom:{
        type:Boolean,
        required:true,
    },
    lookingForRoommate:{
        type:Boolean,
        required:true,
    },
    preferences:{
        clean:{
            type:Boolean,
            default:false,
        },
        pets:{
            type:Boolean,
            default:false,
        },
        smoking:{
            type:Boolean,
            default:false,
        },
        drinking:{
            type:Boolean,
            default:false,
        }
    },
    makeMobilePrivate:{
        type:Boolean,
        default:false,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
    },
    favouritesList:{
        type:[String],
        required:false,
    }
       

    },{timestamps:true, versionKey:false});
const User = mongoose.model('users',userSchema);
module.exports = User;