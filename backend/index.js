const express = require('express');
const bodyParser = require('body-parser');
const {connectDB} = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const app = express();
const port = 3001;
app.use(express.json());
app.use(bodyParser.json());
connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/room', roomRoutes);
app.get('/',(req,res)=>{
    res.send('Welcome to RoomMate api');
});
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});