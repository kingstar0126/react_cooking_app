const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cd(null, "../images");
  },
  filename: (req, file, cb) => {
    console.log(file);

    cb(null, file.originalname)
    // UNUQIE FILENAME
    //cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });


module.exports = { upload };
