import mongoose from "mongoose";
import "dotenv/config";

const connectMongoDB = async () => {
    await mongoose.connect(`mongodb://${process.env.MONGODB_SERVER}`, {
        authSource: "admin",
    });
};

export default { connectMongoDB };
