import express from "express";
import multer from "multer";
import path from "path";
const uploadRouter = express.Router();
// To specify the file path and name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file.originalname);
    // console.log(path);
    cb(null, "./backend-ecommerce-app/uploads");
  },
  filename: function (req, file, cb) {
    // console.log(file.originalname);
    cb(
      null,
      `${file.originalname}${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const fileTypes = /\.(jpe?g|png)$/i;
  const mimeType = /(^image\/)(jpe?g|png)$/i;

  const extnameTest = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeTypeTest = mimeType.test(file.mimetype);
  if (extnameTest && mimeTypeTest) {
    console.log(file.originalname);
    return cb(null, true);
  } else {
    return cb(new Error("images only of type jpg,jpge,png"), false);
  }
};

//middleware to accept and filter the file based on type
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// accepting req body from form input name (image) and return the path of the file
uploadRouter.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});
export default uploadRouter;
