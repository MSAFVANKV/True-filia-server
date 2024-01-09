import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session'
// import morgan from 'morgan';
import cors from 'cors';

import UserRoter from './Routes/UserRouter.js'

const app = express()
dotenv.config({})
app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:5173', // This is the correct version
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    name: "Filia-session",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000 * 60 * 60 * 24 },
}));

app.use('/user',UserRoter)


// DATABSE CONNECTION
mongoose.connect(process.env.MONGO_CONNECTION_LOCAL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('MongoDB Connected...')
}).catch((err) =>{
    console.error('MongoDB Failed!...',err);
})

// server


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`)
    });