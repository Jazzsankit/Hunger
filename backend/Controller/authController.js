const userModel = require("../Model/usersModel");
// const { SECRET_KEY, Gmail_id, pass } = require("../secrets/secret");
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

const SECRET_KEY = process.env.SECRET_KEY;
const Gmail_id = process.env.Gmail_id;
const pass = process.env.pass;

async function sendMail(message){
    try {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.io",
          auth: {
            user: Gmail_id,
            pass: pass
          }
        });
      
        let info = await transporter.sendMail({
            from: message.from, // sender address
            to: message.to, // list of receivers
            subject: message.subject, // Subject line
            text: message.text, // plain text body
        });
        return info;
    } catch (error) {
        return error;
    }
  }
  
//   sendMail();

async function signUp(req, res) {
    try {
        let user = req.body;
        let createUser = await userModel.create({
            name: user.name,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            role: user.role
        });
        console.log(createUser)
        res.status(200).json({
            message: "User Created Succesfully",
            data: createUser
        })
    }
    catch (error) {
        res.status(501).json({
            message: "Failed to create a user",
            error: error
        })
    }
}
async function login(req, res) {
    try {
        let { email, password } = req.body;
        console.log(email, password);
        let loggedInUser = await userModel.find({ email: email });
        if (loggedInUser.length) {
            let user = loggedInUser[0];
            console.log(user)
            if (user.password == password) {
                const token = jwt.sign({ id: user["_id"] }, SECRET_KEY);
                // console.log(token);
                res.cookie('jwt',token,{httpOnly:true});
                res.status(200).json({
                    message: "Logged in succesfully !!",
                    data: loggedInUser[0],
                    token
                })
            }
            else {
                res.status(200).json({
                    message: "Email and Password didn't Matched !!",
                })
            }
        }
        else {
            res.status(200).json({
                message: "No User Found SignUp First",
            })
        }
    }
    catch (error) {
        res.status(501).json({
            message: "Login Failed !!",
            error
        })
    }
}

async function logout(req , res){
    try{
      res.clearCookie("jwt");
      res.redirect("/");
    }
    catch(error){
      res.status(501).json({
        error
      })
    }
  }

async function isLoggedIn(req,res,next){
    try{
        const token = req.cookies.jwt;
        // console.log(req.cookies);
        const payload = jwt.verify(token, SECRET_KEY);
        // console.log(payload)
        if (payload) {
            let user = await userModel.findById(payload.id);
            // console.log(user);
            req.user=user;
            req.name = user.name;
            next();
        }
        else {
            
            next();
        }
    }
    catch(error){
        next();
    }
}

async function protectRoute(req, res, next) {
    try {
            const token = req.cookies.jwt;
            // console.log(req.cookies);
        console.log("Inside protectRoute function");
        // console.log(req.body);
        const payload = jwt.verify(token, SECRET_KEY);
        if (payload) {
        req.id = payload.id;
        next();
        } else {
        res.status(501).json({
            message: "Please Log in !!",
        });
        }
    } catch (error) {
        res.status(501).json({
        message: "Please Log in !!",
        error,
        });
    }

}

async function isAuthorize(req, res, next) {
    try {
        let id = req.id;
        let user = await userModel.findById(id);
        console.log(id);
        if (user.role == "admin") {
            next();
        } else {
            res.status(501).json({
                message: "Not Atthorize"
            })
        }
    } catch (error) {
        res.status(501).json({
            message: "Error in isAuthorize"
        })
    }
}

async function forgetPassword(req, res) {
    try {
        let { email } = req.body;
        let user = await userModel.findOne({ email: email });
        console.log(user)
        if (user) {
            // pwToken
            // timeset
            let token = user.createResetToken();
            console.log(token);
            await user.save({ validateBeforeSave: false });
            // console.log(updatedUser);
            let resetLink = `http://localhost:3000/resetpassword/${token}`;
            let message = {
                from:"gupta.ankit78611@gmail.com",
                to:email,
                subject:"Reset Password",
                text: resetLink
              }
              let response = await sendMail(message);
            res.json({
                message: "Reset Link is sent to email",
                response,
            })
        }
        else {
            res.status(404).json({
                message: "User Not Found ! Please Sign up first !"
            })
        }
    }
    catch (error) {
        res.status(501).json({
            message: "Failed to forget Password",
            error
        })
    }
}

async function resetPasswword(req,res){
    try{
        console.log("ankit")
        const token = req.params.token;
        const {password , confirmPassword} = req.body;
        const user = await userModel.findOne({
          pwToken:token,
          tokenTime:{  $gt : Date.now() }
        })
        console.log(user);
        console.log(password , confirmPassword);
        if(user){
          user.resetPasswordHandler(password , confirmPassword);
          await user.save();
          res.status(200).json({
            message:"Password Reset Succesfull !!!"
          })
        }
        else{
          res.status(200).json({
            message:"Password Reset Link Expired !!!"
          })
        }
      }
      catch(error){
        res.status(404).json({
          message:"Failed to reset password",
          error
        })
      }
}

module.exports.isAuthorize = isAuthorize;
module.exports.protectRoute = protectRoute;
module.exports.signUp = signUp;
module.exports.login = login;
module.exports.forgetPassword = forgetPassword;
module.exports.resetPasswword = resetPasswword;
module.exports.isLoggedIn = isLoggedIn;
module.exports.logout = logout;