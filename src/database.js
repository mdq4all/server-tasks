import mongoose from "mongoose"
import config from "./config"

// Connect to MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoDBuri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error.message);
    }
};

export default connectDB