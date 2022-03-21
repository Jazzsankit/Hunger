const express = require("express");
const { signUp, login, protectRoute, forgetPassword, resetPasswword } = require("../Controller/authController");
const userRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      if(file.fieldname == "user")
          cb(null, 'public/images/users')
      else
          cb(null, 'public/images/plans')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+".jpg")
  }
})

function fileFilter (req, file, cb) {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  if(file.mimtype.includes("image")){
    
    cb(null, true)

  }else{

    cb(null, false)
  }

}

const upload = multer({ storage: storage }, {fileFilter:fileFilter})

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  updateProfilePhoto,
} = require("../Controller/userController");

// userRouter
// .route("")
// .get(getAllUsers)
// .post(createUser);


userRouter
.route("/signup")
.post(signUp)

userRouter.route("/login")
.post(login)

userRouter.post("/forgetpassword" , forgetPassword);
userRouter.patch("/resetpassword/:token" , resetPasswword);

userRouter.use(protectRoute);
userRouter.patch("/updateprofilepage",upload.single("user") , updateProfilePhoto)
userRouter.route("").get(getUserById).patch( updateUserById).delete(deleteUserById);

module.exports = userRouter;