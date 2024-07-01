const {baseResponses} = require('../helpers/baseResponses');
const {Rating} = require('../models/ratingModel');
const User = require('../models/userModel');
const {Room} = require('../models/roomModel');
const giveRatings = async(req,res)=>{
    try{
        const{user_id,room_id,rating}=req.body;
        if(!user_id ||!room_id ||!rating){
            return res.status(400).json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED());
        }
        const user = await User.findOne({_id: user_id});
        const  room = await Room.findOne({_id: room_id});
        if(user && room){
        const newRating = new Rating({
            user_id,
            room_id,
            rating
        });
        await newRating.save();
        return res.status(200).json(baseResponses.constantMessages.RATING_GIVEN());
    }
    return res.status(404).json(baseResponses.constantMessages.USER_OR_ROOM_NOT_FOUND());

    }catch(error){
        return res.status(500).json(baseResponses.error(error.message));
    }
};
const getRating = async(req, res) => {
    try{
        const user_id=req.query.user_id;
        const room_id=req.query.room_id;
    
        if(!user_id || !room_id){
            return res.status(400).json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED());
        }
        const rating = await Rating.findOne({user_id: user_id, room_id: room_id});
        if(!rating) {
            return res.status(404).json(null);
        }
        return res.status(200).json(rating);
    }catch(error){
        return res.status(500).json(baseResponses.error(error.message));
    }
};
const getAllRatings = async (req, res) => {
    try{
        const recLimit = parseInt(req.query.limit) || 10;
        const pageNumber = parseInt(req.query.page) || 1;
        const room_id = req.query.room_id;
        const count = await Rating.countDocuments();
        const totalPages = Math.ceil(count / recLimit);
        const rating = await Rating.find({room_id: room_id})
        .skip((pageNumber-1)*recLimit)
        .limit(recLimit);
        
        if(!rating) {
            return res.status(404).json(null);
        }
        return res.status(200).json({totalPages,count,rating});
    }catch(error){
        return res.status(500).json(baseResponses.error(error.message));
    }
};
const totalRatings = async (req, res) => {
    try{
        const room_id = req.query.room_id;
        if(!room_id){
            return res.status(400).json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED());
        }
        const rating = await Rating.find({room_id: room_id});
        const totalRating = rating.reduce((sum,rating) => sum + rating.rating, 0);
        const averageRating = rating.length ? totalRating/rating.length:0 ;
        if(!rating) {
            return res.status(404).json(null);
        }
        return res.status(200).json(averageRating);
    }catch(error){
        return res.status(500).json(baseResponses.error(error.message));
    }
};
module.exports = {giveRatings,getRating,getAllRatings,totalRatings};