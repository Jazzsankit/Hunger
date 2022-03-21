const express = require("express");
const planRouter = require("./Router/planRouter");
const userRouter = require("./Router/userRouter");
const viewRouter = require("./Router/viewRouter");
const bookingRouter = require("./Router/bookingRouter");
const path = require("path");
var cookieParser = require('cookie-parser');

const app = express();



// it tracks incoming request and see if there is data in the request => the data will be fed in req.body
app.use( express.json());
app.use(cookieParser());



//for searching file in public folder
app.use(express.static("public"));
// view engine set
app.set("view engine" , "pug");
// view path set
app.set("views" , path.join(__dirname,"View"));


// app.httpMethod( appRoute , cb function( request , response   )      )
app.use("/api/plans" , planRouter);
app.use("/api/user" , userRouter);
app.use("/" , viewRouter);
app.use("/api/booking",bookingRouter);

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("server started at port 3000");
});