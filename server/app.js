if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const Controller = require("./controllers/controller");
const authentication = require("./middleware/authentication")
const upload = require("./middleware/multer");



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post("/login", Controller.login)
app.use(authentication)
app.get("/user/:UserId", Controller.getUserById)
app.post("/files", upload.single("document"),Controller.addFile)
app.get("/files", Controller.fetchAllFiles)
// app.get("/files/:FileId", Controller.getFileById)
app.get("/files/:FileId", Controller.fetchFileById)


app.use(errorHandler)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});