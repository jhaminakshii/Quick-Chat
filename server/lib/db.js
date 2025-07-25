import mongoose from "mongoose";

// Function to connect to mongodb database

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=>
        console.log('Database Connected'));
        await mongoose.connect(`${process.env.Mongodb_URI}/chat-app`);
    } catch (error) {
       console.log(error) 
    }
}