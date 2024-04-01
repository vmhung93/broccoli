import mongoose from "mongoose";
import config from "./config";

const connectMongoDB = async () => {
    await mongoose.connect(`mongodb://${config.MONGODB_SERVER}`, {
        authSource: "admin",
    });
};

export default { connectMongoDB };
