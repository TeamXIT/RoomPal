const {baseResponses} = require('../helpers/baseResponses');
const {Feedback} = require('../models/feedbackModel');
const giveFeedback = async (req, res) => {
    try {
      const { user_id, comment, room_id } = req.body;
      const newFeedback = new Feedback({
        comment,
        user_id,
        room_id
      });
      newFeedback.save();
      return res.status(200).json(baseResponses.constantMessages.FEEDBACK());
    } catch (error) {
      return res.status(500).json(baseResponses.error(error.message));
    }
  };
  const getAllFeedback = async (req, res) => {
    try {
      const recLimit = parseInt(req.query.limit) || 10;
      const pageNumber = parseInt(req.query.page) || 1;
      let filter = {};
      const count = await Feedback.countDocuments(filter);
      const totalPages = Math.ceil(count / recLimit);
      const feedbackList = await Feedback.find(filter)
      .skip((pageNumber-1)*recLimit)
      .limit(recLimit); 
      if(!feedbackList){
        return res.status(404).json(baseResponses.constantMessages.FEEDBACK_NOT_FOUND());
      }
  
      return res.status(200).json({
        success: true,
        totalPages,
        totalCount: count,
        data: feedbackList
      });
    } catch (error) {
      return res.status(500).json(baseResponses.error(error.message));
    }
  };
module.exports = {giveFeedback,getAllFeedback}  