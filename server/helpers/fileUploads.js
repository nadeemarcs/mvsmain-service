const multer = require("multer");

const excelFilter = (req, file, cb) => {
  if (true) {
    cb(null, true);
  } else {
    cb("Please upload only document file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, "./storage");
   // cb(null, "/home/wavenet012/wavenet/irisserver/server/media/temp/");
    
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;