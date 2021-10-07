import mongoose from 'mongoose';

const {Schema} = mongoose;
const product = new Schema({
   name:String,
   price:Number,
   thumbnail:String,
   slug:String,
   info:{
     weight:Number,
     color:Array,
     frame:String,
     img:Array
   }, 
})

const products = mongoose.model('bike',product);
export default products;