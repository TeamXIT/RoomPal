const BASE_RESPONSE_MESSAGES = {
    SUCCESS:{
        USER_REGISTERED: 'User registered successfully',
        USER_LOGGED_IN: 'User logged in successfully',
        ROOM_CREATED_SUCCESSFULLY:'Room created successfully',
        RATING_GIVEN: 'Rating given successfully',
        ORDER_CREATED_SUCCESSFULLY: 'Order created successfully',
        ORDER_FETCHED_SUCCESSFULLY: 'Order fetched successfully',
        REFUND_CREATED: 'Refund created successfully',
        REFUND_FETCHED: 'Refund fetched successfully',
        PAYMENT_CREATED: 'Payment created successfully'
    },
    ERROR:{
        ALL_FIELDS_REQUIRED: 'All fields are required',
        PASSWORD_MISMATCH: 'Password do not match',
        USER_NOT_FOUND: 'User not found',  
        INVALID_PASSWORD: 'Invalid password', 
        FEEDBACK_NOT_FOUND: 'Feedbacks are not given till now',
        ORDER_NOT_FOUND: 'Order not found'
    }
};
module.exports = {BASE_RESPONSE_MESSAGES};