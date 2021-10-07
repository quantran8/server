import express,{NextFunction, Request,Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connection from './DB/index';
import cloudinarys, { multiUpload } from './mdw/cloudinary';
import upload from './mdw/multer';
import products from './DB/products';
import {ReqData} from './lib/index'
dotenv.config();

connection()
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.post('/single_img',upload.single('img'),(req: Request, res:Response,next: NextFunction) => {
    const file = req.file;
    if (!file) {
      const error = new Error('Please upload a file')
      return next(error)
    }
    console.log(file.path);
    cloudinarys.uploader.upload(file.path,(err,data) => {
     if(err)
     console.log(err.message)
     else res.send(data?.secure_url)
    })
  
})

app.post('/multi_img',upload.array('imgs'),async(req: Request, res:Response,next: NextFunction) => {
    const files= req.files;
    console.log('file : ',files)
    if (!files) {
      const error = new Error('Please upload a file')
      return next(error)
    }
     const response = await multiUpload(files as Array<Express.Multer.File>)
      console.log(response)
      res.send(response)
})

app.post('/upload',async(req: Request ,res: Response) => {

    const body:ReqData = req.body;
    const data ={
      name:body.name,
      price:body.price,
      thumbnail:body.thumbnail,
      slug:body.slug,
      info:{
         weight:body.weight,
         color:body.color.split(','),
         frame:body.frame,
         img:body.imgs
      }
    }
    console.log(data)
    const item = new products(data);
    const response = await item.save();
    console.log(response)
    res.send(response)
})

app.get('/bikes',async(req: Request, res:Response) => {
  const params = req.query
  console.log(params)
  const response = await products.find({slug:params.slug})
  res.send(response)
})

app.get('/bikes/:id',async(req: Request, res:Response) => {
  const {id} = req.params
  const response = await products.findById(id);
  console.log(response)
  res.send(response)
})

app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`)
})
