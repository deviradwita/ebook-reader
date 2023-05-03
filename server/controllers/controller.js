const { User, File } = require("../models/index");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const path = require("path");
const bcrypt = require("bcrypt");
const { createToken } = require("../middleware/jwt");
const { Op } = require("sequelize");
const ImageCloud = require("../helpers/imagekit");

class Controller {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) {
        throw { code: 400, message: "Email is required" };
      }
      if (!password) {
        throw { code: 400, message: "Password is required" };
      }

      const user = await User.findOne({
        where: { email: email },
      });

      if (!user) {
        throw { code: 401, message: "Invalid email/password" };
      }

      const comparedPassword = await bcrypt.compare(password, user.password);

      if (!comparedPassword) {
        throw { code: 401, message: "Invalid email/password" };
      }
      const payload = {
        id: user.id,
      };

      const access_token = createToken(payload);

      res.status(200).json({
        access_token: access_token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
        attributes: ["id", "username", "email", "fullname", "role"],
      });

      if (!user) {
        throw { code: 404, message: "User Not Exist" };
      }

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async addFile(req, res, next) {
    try {
     
      if (!req.file) {
        console.log("No file received");
        throw { code: 400, message: "No file received" };
      }
   
      let link = await ImageCloud(req.file);
      let document = link.url;

      const newFile = await File.create({
        title: req.body.title,
        document,
        UserId: req.user.id,
      });

      res.status(201).json(newFile);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async fetchAllFiles(req, res, next) {
    try {
   
      const allFile = await File.findAll({
        where: {
          UserId: req.user.id,
        },
        order: [["createdAt", "DESC"]],
      });

      if (!allFile) {
        throw { code: 404, message: "No File" };
      }
      res.status(200).json(allFile);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async downloadFileById(req, res, next) {
    try {
      const file = await File.findOne({
        UserId: req.user.id,
        id: req.params.FileId,
      });

      if (!file) {
        throw {
          code: 403,
          message: "You do not have permission to access this file",
        };
      }

      // Serve the file for download
      const fileStream = fs.createReadStream(file.document);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${file.filename}`
      );
      fileStream.pipe(res);
    } catch (err) {
      next(err);
    }
  }


  static async fetchFileById(req, res, next) {
    try {
      const file = await File.findOne({
        UserId: req.user.id,
        id: req.params.FileId,
      });

      if (!file) {
        throw {
          code: 403,
          message: "You do not have permission to access this file",
        };
      }

      res.status(200).json(file);

      
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
