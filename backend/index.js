const express = require('express');
const bodyParser = require('body-parser');
const {connectDB} = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const app = express();
const port = 3001;
app.use(express.json());
app.use(bodyParser.json());
connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/payment', paymentRoutes);
app.get('/',(req,res)=>{
    res.send('Welcome to RoomMate api');
});
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});