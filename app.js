const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const { PORT, MONGO_URL } = process.env;
const app = express(); 
app.use(cookieParser());
app.use(express.json());

async function connect(){
    await mongoose.connect(MONGO_URL , {})
    console.log(`Server connect db ${MONGO_URL}`);
    app.listen(PORT)
    console.log(`Server listen on ${PORT}`);
}
connect();

