import cloudinary from 'cloudinary';
const cloudinarys = cloudinary.v2;
cloudinarys.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

type files =Array<Express.Multer.File>

export const multiUpload = async (imgs:files):Promise<Array<string>> => {
    const list = []
    for(const item of imgs) {
      const res = await cloudinarys.uploader.upload(item.path);
      list.push(res.secure_url);
    }
    return list
  }

  
export default cloudinarys