// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const passportLocalMongoose = require("passport-local-mongoose");

// This two line was used in different level of authentications

// const encrypt = require("mongoose-encryption"); :: this was used in encrypting password to the database
// const md5 = require("md5");:: this was used while we were hashing using md5 module, but this could cause issue for user with the same password

// const saltRound = 10;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  token: String,
});
userSchema.plugin(passportLocalMongoose);

//        THE BELLOW CODE USED TO ENCRYPT PASSWORD TO OUR DATABASE SO THAT IF SOMEONE HACKS OUR DATABASE WON'T SEE THE PASSWORD AS PLAIN TEXT
//  BUT WEIRD STRING.

// const encryptionString = process.env.ENCRYPTION_STRING;

// userSchema.plugin(encrypt, {
//   secret: encryptionString,
//   encryptedFields: ["password"],
// });

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//  ============= STARTING ROUTING AND BUILDING OUR SERVER ==============

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/secrets", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

// app.post("/register", (req, res) => {
//   //  This is the code that encrypts the password and saves it to our database.
//   // This code hash the user typed password and then the hashed one will be saved to our database that's why password=hash instead of req.body.password
//   bcrypt.hash(req.body.password, saltRound, function (error, hash) {
//     const newUser = new User({
//       email: req.body.username,
//       password: hash,
//     });
//     newUser
//       .save()
//       .then(() => {
//         res.render("secrets");
//       })
//       .catch((error) => {
//         res.send(error);
//       });
//   });
//   // =========== THIS IS HOW THE CODE WAS LOOKING WHILE WE WERE USING md5 ENCRYPTION LIBRARY. ==============
//   // const newUser = new User({
//   //   email: req.body.username,
//   //   password: md5(req.body.password),
//   // });
//   // newUser
//   //   .save()
//   //   .then(() => {
//   //     res.render("secrets");
//   //   })
//   //   .catch((error) => {
//   //     res.send(error);
//   //   });
// });

// =======This code is post("/register") using cookies

app.post("/register", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  // CREATING A TOKEN.
  // const token = jwt.sign(
  //   { name: req.body.username },
  //   "hhhhhhhhhhhhhhhhhhlsjssssssssssssssssssshhhhhhhhhhhhhiiiiiiiiiiiiiiii54lshhhhhhhhhhsujei083is"
  // );
  // console.log(token);
  User.register({ username: username }, password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        // this commented line of code will be used to generate a token once the user had been authorized to register.
        // const token = jwt.sign(
        //   { name: req.body.username },
        //   "hhhhhhhhhhhhhhhhhhlsjssssssssssssssssssshhhhhhhhhhhhhiiiiiiiiiiiiiiii54lshhhhhhhhhhsujei083is"
        // );
        // console.log(token);
        res.redirect("/secrets");
      });
    }
  });
});

// ========This code is post("/login") using cookies but this doesn't handle what could happen if the user who is login
// is not authorized

// app.post("/login", function (req, res) {
//   const newUser = new User({
//     username: req.body.username,
//     password: req.body.password,
//   });
//   req.login(newUser, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       passport.authenticate("local")(req, res, function () {
//         res.redirect("/secrets");
//       });
//     }
//   });
// });

// ========This code is post("/login") using cookies and if the user who is trying to login is not authorized we will
// redirect him to the register page, using passport also provide hashing method

app.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      // User authentication failed, redirect to register page
      return res.redirect("/register");
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err);
        return next(err);
      }
      // this commented line of code will be used to generate a token once the user had been authorized to login.

      // const token = jwt.sign(
      //   { name: req.body.username },
      //   "hhhhhhhhhhhhhhhhhhlsjssssssssssssssssssshhhhhhhhhhhhhiiiiiiiiiiiiiiii54lshhhhhhhhhhsujei083is"
      // );
      // console.log(token);
      // User authentication succeeded, redirect to secrets page
      return res.redirect("/secrets");
    });
  })(req, res, next);
});

// The bellow code was used to handle"/login"  using bcrypt module this also use hashing method

// app.post("/login", function (req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//   // The below code will find One user with username equal Username typed and if found it inside our database it will compare if the username inputed is equal to the hashed one we stored in our DB and return boolean(true/false) if true it means that password matches and we will render him a particular page/informations.

//   User.findOne({ email: username })
//     .then(function (foundUser) {
//       if (foundUser) {
//         bcrypt.compare(password, foundUser.password, function (err, result) {
//           if (result === true) {
//             res.render("secrets");
//           }
//         });
//       }
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// README
// in the above code we were practicing level 1 of authentication where we will allow user to register or login in order to access the information
// that write in the secrets file located in view, so here is the explaination of some logic we applied

// app.post("/register"): this will allow the user to register in order to access the secrets file and we will save the information related
// to the user inside our database.
//
// app.post("/login"): this will allow the user who had account in our site to login using his account username and password and we will check it
// we have the user in our database if yes then we will check password if matches with the one stored in our db if yes again we will allow the
// user to access our secrets file.
