import mongoose  from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connection =  async () => {
    try{
        const url = 'mongodb://localhost:27017/New_item'
        await mongoose.connect(url);
        console.log('connect successful');
    }
    catch(err){
        console.log('error connecting----------------');
    }
}
export default connection;
