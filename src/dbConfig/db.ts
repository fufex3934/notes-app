import mongoose, { ConnectOptions, Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
let isConnected = false;

export const connectToDB = async (): Promise<void> => {
    if (isConnected) return;
    try {
        const db: Mongoose = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        isConnected = db.connection.readyState === 1;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Mongo Connection failed", (error as Error).message);
    }
};
