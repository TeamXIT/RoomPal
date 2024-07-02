const baseResponses = {
    success:(message,data=null) => ({success:true, message, data}),
    error:(message,data=null) => ({success:false, error:message, data}),
    constantMessages: {
        ALL_FIELDS_REQUIRED:(data=null) =>baseResponses.error('All fields are required',data),
        PASSWORD_MISMATCH:(data=null) =>baseResponses.error('Password do not match',data),
        USER_REGISTERED:(data=null) =>baseResponses.success('User registred successfully',data),
        USER_NOT_FOUND:(data=null) =>baseResponses.error('User not found',data),
        INVALID_PASSWORD:(data=null) =>baseResponses.error('Invalid password',data),
        USER_LOGGED_IN:(data=null) =>baseResponses.success('User logged in successfully',data),
        OTP_VERIFIED:(data=null) =>baseResponses.success('otp verified successfully',data),
        ROOM_CREATED_SUCCESSFULLY:(data=null) =>baseResponses.success('Room created successfully',data),
        ROOM_NOT_FOUND :(data=null) =>baseResponses.error('Room not found',data),
        FEEDBACK:(data=null)=> baseResponses.success('Feedback updated successfully',data),
        FEEDBACK_NOT_FOUND:(data=null)=> baseResponses.error('Feedbacks are not given till now',data),
        RATING_GIVEN:(data=null)=> baseResponses.success('Rating given successfully',data),
        ORDER_CREATED_SUCCESSFULLY:(data=null)=> baseResponses.success('Order created successfully',data),
        ORDER_FETCHED_SUCCESSFULLY:(data=null)=> baseResponses.success('Order fetched successfully',data),
        ORDER_NOT_FOUND:(data=null)=> baseResponses.error('Order not found',data),
        REFUND_CREATED:(data=null)=> baseResponses.success('Refund created successfully',data),
        REFUND_FETCHED:(data=null)=> baseResponses.success('Refund fetched successfully',data),
        PAYMENT_CREATED:(data=null)=> baseResponses.success('Payment created successfully',data),
        PASSWORD_RESET_SUCCESS:(data=null)=> baseResponses.success('Password updated successfully',data),
        USER_OR_ROOM_NOT_FOUND:(data=null)=> baseResponses.error('User or room not found',data),
        MOBILE_NUMBER_ALREADY_EXISTS:(data=null) => baseResponses.error('Mobile number already exists',data),
        EMAIL_ALREADY_EXISTS:(data=null) => baseResponses.error('Email already exists',data),
    }
};
module.exports = {baseResponses};