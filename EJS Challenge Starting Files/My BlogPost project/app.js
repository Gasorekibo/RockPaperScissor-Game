//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// this lodash library is used to convert different input in the same value. check on https://lodash.com/
const _ = require("lodash");

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var posts = [];

// Routing my Home page(/) using ejs.
// once user go to / it will take variable homeContent and assign it to the value of homeStartingContent given from our express server
// this also works on all Routers

app.get("/", function (req, res) {
  res.render("home", {
    homeContent: homeStartingContent,
    post: posts,
  });
});

// Routing /about page

app.get("/about", function (req, res) {
  res.render("about", { aboutInfo: aboutContent });
});
// Routing /contact page

app.get("/contact", function (req, res) {
  res.render("contact", { contactInfo: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const title = req.body.postTitle;
  const body = req.body.postBody;
  const post = {
    title: title,
    body: body,
  };
  posts.push(post);
  res.redirect("/");
});

// USING ROUTING PARAMETER TO GIVE TO HANDLE DIFFERENT REQUEST ENDPOINT
// For more info about routing using express look at: https://expressjs.com/en/guide/routing.html

app.get("/posts/:postName", function (req, res) {
  const titleInputed = _.lowerCase(req.params.postName);
  // CHECKING THE CONDITION IF IT IS TRUE WE SHOULD LENDER A PAGE CORRESPONDING TO A PARTICULAR POST TITLE.

  posts.forEach(function (eachpost) {
    const titleOfPost = _.lowerCase(eachpost.title);
    if (titleInputed === titleOfPost) {
      res.render("post", {
        postHead: eachpost.title,
        postContent: eachpost.body,
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
