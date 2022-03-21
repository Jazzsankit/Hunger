const userModel = require("../Model/usersModel");

async function getAllUsers(req, res) {
  try{
    let users = await userModel.find({});
    res.status(200).json({
      message:"Got all users successfully !!",
      data : users
    })
  }
  catch(error){
    res.status(501).json({
      message:"Failed to get all user",
      error : error
    })
  }
}

async function createUser(req, res) {
  try{
    let sentUser = req.body;
    let user = await userModel.create(sentUser);
    res.status(200).json({
      message:"User Created Succesfully",
      data :user
    })
  }
  catch(error){
    res.status(501).json({
      message:"Failed to create a user",
      error : error.errors.discount.message
    })
  }
}
async function getUserById(req, res) {
  try{
    let id = req.id;
    let user = await userModel.findById(id);
    console.log(user)
    res.status(200).json({
      message: "Succesfully get user by id",
      data: user,
    });
  }
  catch(error){
    res.status(404).json({
      message: "user Not found !!!",
      error:error
    });

  }
}
async function updateUserById(req, res) {
  try{
    let  id  = req.id;
    let updateObj = req.body.updateObj;
    let updateduser = await userModel.findByIdAndUpdate(id , updateObj , {new:true} );
    res.status(200).json({
      message:"updated user successfully !!",
      data : updateduser
    })
  }
  catch(error){
    res.status(501).json({
      message:"failed to update user",
      error
    })
  }
}
async function deleteUserById(req, res) {
  try{
    let  id  = req.id;
    let deletedUser = await userModel.findByIdAndDelete(id);
    res.status(200).json({
      message:"user deleted !!",
      data : deletedUser
    })
  }
  catch(error){
    res.status(501).json({
      message:"user failed to delete !!",
      error
    })
  }
  
}

async function updateProfilePhoto(req,res){
  try {
    let file = req.file;
    // console.log(file);
    let imagePath = file.destination+"/"+file.filename;
    imagePath = imagePath.substring(6);
    console.log(imagePath);
    let id = req.id;
    console.log(id);
    let user = await userModel.findById(id);
    user.pImage = imagePath;
    await user.save({validateBeforeSave:false}); 
    res.json({
      message:"Profile Photo updated !!"
    })
  } catch (error) {
    res.status(200).json({
      message:"failed to uplload!",
      error
    })
  }
}




module.exports.getAllUsers = getAllUsers;
module.exports.createUser = createUser;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.deleteUserById = deleteUserById;
module.exports.updateProfilePhoto = updateProfilePhoto;