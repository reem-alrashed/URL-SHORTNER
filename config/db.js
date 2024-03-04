import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected!");
    } catch (error) {
        console.error('Could not connect to DB:', error.message);
    }
  }
  
  export default connectDB;