const cloudinary = require('cloudinary');
const sharp = require('sharp');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


const uploadSong = async (file) => {
  const { path, mimetype } = file;
  const extension = mimetype.split('/')[1];

  const uploaded = await cloudinary.v2.uploader.upload(path, {
    resource_type: 'auto'
  });

  const duration = uploaded.duration;
  const medianame = uploaded.secure_url.split('/')[7].split('.')[0];
  const medialink = uploaded.secure_url;
  return { medialink, extension, medianame, duration };
};

const uploadImage = async (file) => {
  const { path, mimetype } = file;
  const imagePath = `C:\\Users\\User\\AppData\\Local\\Temp`
  const extension = mimetype.split('/')[1];
  await sharp(path).webp({quality: 80}).resize({width: 240, height: 240, fit: 'cover',})
  .toFile(`${imagePath}\\${file.filename}.webp`)

  const optimizedPath = `C:\\Users\\User\\AppData\\Local\\Temp\\${file.filename}.webp`

  const uploaded = await cloudinary.v2.uploader.upload(optimizedPath, {
    resource_type: 'auto'
  });

  const duration = uploaded.duration;
  const medianame = uploaded.secure_url.split('/')[7].split('.')[0];
  const medialink = uploaded.secure_url;
  return { medialink, extension, medianame, duration };
};

module.exports = { uploadImage, uploadSong }