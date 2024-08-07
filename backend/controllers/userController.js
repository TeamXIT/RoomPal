const User = require("../models/userModel");
const { baseResponses } = require("../helpers/baseResponses");
const { Room } = require("../models/roomModel");
const mongoose = require("mongoose");
module.exports = {
  getUserbyMobile: async (req, res) => {
    const { mobileNumber } = req.query;
    if (!mobileNumber) {
      return res.status(400).json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED());
    }
    console.log(mobileNumber)
    const user = await User.findOne({ mobileNumber: mobileNumber.toString() });
    if (!user) {
      console.log(user)
      return res.status(404).json(baseResponses.constantMessages.USER_NOT_FOUND());
    }

    return res.status(200).json(baseResponses.success(user));
  },
  updateUser: async (req, res) => {
    try {
      const { fullName, email, dateOfBirth, gender, makeMobilePrivate, image } = req.body;
      const { mobileNumber } = req.query;
      const user = await User.findOne({ mobileNumber: mobileNumber });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      if (fullName) user.fullName = fullName;
      if (email) user.email = email;
      if (mobileNumber && !user.makeMobilePrivate) user.mobileNumber = mobileNumber; // Only update mobileNumber if it's not private
      if (dateOfBirth) user.dateOfBirth = dateOfBirth;
      if (gender) user.gender = gender;
      if (makeMobilePrivate !== undefined) user.makeMobilePrivate = makeMobilePrivate;
      if (image) user.image = image;

      await user.save();

      res.status(200).json({ success: true, message: 'Profile updated successfully', data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  getAll: (req, res) => {
    const users = User.find();
    if (!users) {
      return res
        .status(404)
        .json(baseResponses.constantMessages.USER_NOT_FOUND());
    }
    return res.status(200).json(baseResponses.success(users));
  },
  addToFavourites: async (req, res) => {
    try {
      const { userId, roomId } = req.query;

      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json(baseResponses.constantMessages.USER_OR_ROOM_NOT_FOUND());
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json(baseResponses.constantMessages.USER_NOT_FOUND());
      }
      if (!user.favouritesList.includes(roomId)) {
        user.favouritesList.push(roomId);
        await user.save();
        return res.status(200).json(baseResponses.constantMessages.ROOM_ADDED_TO_FAVOURITE_LIST());
      }
      return res.status(500).json(baseResponses.constantMessages.FAVOURITE_LIST_NOT_UPDATED());
    } catch (error) {
      return res.status(500).json(baseResponses.error(error.message));
    }
  },
  removeFromFavourites: async (req, res) => {
    try {
      const { userId, roomId } = req.query;

      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json(baseResponses.constantMessages.USER_OR_ROOM_NOT_FOUND());
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json(baseResponses.constantMessages.USER_NOT_FOUND());
      }
      if (user.favouritesList.includes(roomId)) {
        user.favouritesList.pull(roomId);
        await user.save();
        return res.status(200).json(baseResponses.constantMessages.ROOM_REMOVE_TO_FAVOURITE_LIST());
      }
      return res.status(500).json(baseResponses.constantMessages.FAVOURITE_LIST_NOT_UPDATED());
    } catch (error) {
      return res.status(500).json(baseResponses.error(error.message));
    }
  },
  getfavouritesListRooms:async (req, res) => {
    try {
      const { userId } = req.query;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json(baseResponses.constantMessages.USER_NOT_FOUND());
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json(baseResponses.constantMessages.USER_NOT_FOUND());
      }
      const rooms = await Room.find({ _id: { $in: user.favouritesList } });
      if (!rooms) {
        return res.status(404).json(baseResponses.constantMessages.ROOM_NOT_FOUND());
      }
      return res.status(200).json(baseResponses.success(rooms));
    } catch (error) {
      return res.status(500).json(baseResponses.error(error.message));

}
  }
}
