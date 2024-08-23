const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathName = "public/uploads"
    cb(null, pathName)
  },
  filename: function (req, file, cb) {
    console.log("🚀 ~ file:", req, file)
    const ext = path.extname(file.originalname)
    const name = path.basename(file.originalname, ext);
    const fixNameSpace = name.replace(/\s+/g, "_");
    const fileName = "ecommerce_" + fixNameSpace + "_" + Date.now() + ext
    cb(null, fileName)
  }
})

const upload = multer({
  storage: storage
});

module.exports = upload;