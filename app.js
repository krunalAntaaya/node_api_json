const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");

const fs = require('fs')
const errorController = require("./controllers/error");
const User = require("./models/user");

// const MONGODB_URI = "mongodb://localhost/shop";

const app = express();
// const store = new MongoDBStore({
//   uri: MONGODB_URI,
//   collection: "sessions",
// });
// const csrfProtection = csrf();

// const fileStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "images");
//   },

//   // By default, multer removes file extensions so let's add them back
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

//file filter
// const filefilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

app.set("view engine", "ejs");
app.set("views", "views");

// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
// const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   multer({ storage: fileStorage, fileFilter: filefilter }).single("image")
// );
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
// app.use(
//   session({
//     secret: "my secret",
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );
// app.use(csrfProtection);
// app.use(flash());

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

// app.use((req, res, next) => {
  // throw new Error('Sync Dummy');
  // if (!req.session.user) {
  //   return next();
  // }
  // User.findById(req.session.user._id)
  //   .then((user) => {
  //     if (!user) {
  //       return next();
  //     }
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => {
  //     next(new Error(err));
  //   });
// });

// app.use("/admin", adminRoutes);
// app.use(shopRoutes);
// app.use(authRoutes);

// app.get("/500", errorController.get500);

// app.use(errorController.get404);


app.get('/festivals',async(req,res,next)=>{
  const result =  fs.readFileSync('./festival.json');
  console.log("resulyt-------------->",result);
  res.status(200).json({data:JSON.parse(result.toString())})
})
// app.use((error, req, res, next) => {
//   // res.status(error.httpStatusCode).render(...);
//   // res.redirect('/500');
//   res.status(500).render("500", {
//     pageTitle: "Error!",
//     path: "/500",
//     isAuthenticated: req.session.isLoggedIn,
//   });
// });
app.listen(8000)

// mongoose
  // .connect(MONGODB_URI)
  // .then((result) => {
  //   app.listen(8000);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
