import mongoose from "mongoose"
import { ENV } from "../config/config"

export async function connectDb() {
    try {
        console.log("Database Url : " + ENV.DB_URL)
        mongoose.set("debug", true)
        await mongoose.connect(ENV.DB_URL)
        console.log("Database connected_____")
    } catch (e) {
        console.log("Error to connect database____")
        console.log(e)
    }
}