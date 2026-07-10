import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.join(process.cwd(),".env")
});


export default {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.bcrypt_salt_rounds || 10
}