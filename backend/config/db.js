import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();

export const dbConnect = async () => {
    mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.log('Error connecting to MongoDB');
        console.error(error);
        process.exit(1);
    });
}
