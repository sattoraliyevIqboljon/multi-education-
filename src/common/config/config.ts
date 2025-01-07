import dotenv from "dotenv";
import path from "path"

dotenv.config({
    path: path.resolve(__dirname, "../../../.env")
})
export const ENV = {
    ADMIN_PORT: parseInt(process.env.ADMIN_PORT) || 7777,
    // USER_PORT: parseInt(process.env.USER_PORT) || 8888,
    UPLOAD_PORT: parseInt(process.env.UPLOAD_PORT) || 9999,
    DB_URL: process.env.DB_URL,//|| "mongodb://127.0.0.1:27017/NewProject_1",
    HOST: process.env.HOST || "0.0.0.0",
    TOKEN_KEY: process.env.TOKEN_KEY || "key",
    // PASS_EMAIL: process.env.PASS_EMAIL,
    // SENDER_EMAIL: process.env.SENDER_EMAIL,
}
