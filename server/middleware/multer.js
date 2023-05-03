

const multer = require("multer");
var path = require("path");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,

});




module.exports = upload;
