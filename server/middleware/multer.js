// const multer = require("multer");
// let path = require("path");


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./assets/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,

// });

// module.exports = upload;


const multer = require("multer");
var path = require("path");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  // fileFilter: function (req, file, cb) {
  //   // console.log(file, '<< multer');
  //   var ext = path.extname(file.originalname);
  //   if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
  //     return cb(null, false);
  //   }
  //   cb(null, true);
  // },
});

module.exports = upload;
