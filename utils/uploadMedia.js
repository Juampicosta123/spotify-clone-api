const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const uploadMedia = async (file) => {
  const { path, mimetype } = file;
  const extension = mimetype.split('/')[1];
  const uploaded = await cloudinary.v2.uploader.upload(path, {
    resource_type: 'auto'
  });
  const medianame = uploaded.secure_url.split('/')[7].split('.')[0];
  const medialink = uploaded.secure_url;
  return { medialink, extension, medianame };
};

module.exports = { uploadMedia }