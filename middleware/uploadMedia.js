const multer = require('multer');

const multerStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    const filetype = file.mimetype.split('/')[0];
    if(filetype !== 'image' && filetype !== 'audio') cb('Extension not suported')
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});


const multerFilter = (req, file, cb) => {
  cb(null, true);
};
const uploadMedia = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {fileSize: 1048576*10}
});

module.exports = uploadMedia;