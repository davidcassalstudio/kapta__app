import User from "@/models/user";
import { connectDB } from "./utils"

export const getUsers = async () => {
    try{
        connectDB();
        const users = await User.find()
        return users
    }catch(err){
        console.log(err)
        throw new Error('Failed to fetch users!')
    }
}