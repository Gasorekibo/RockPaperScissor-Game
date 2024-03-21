const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/WikiDB", { useNewUrlParser: true });
const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

// app.get("/articles", (req, res) => {
//   Article.find({})
//     .then(function (articlesFound) {
//       res.send(articlesFound);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// // When Building this we used postman instead of form coz we didn't make a form to post you can download it by visiting this link
// //  https://www.postman.com/downloads/    it is used to create api without using forms
// // NB: The postman also support all http verbs so it is possible to make GET, POST, DELETE, PUT, PATCH ... using GUI of postman

// app.post("/articles", function (req, res) {
//   const articleTitle = req.body.title;
//   const articleContent = req.body.content;
//   const articlePosted = new Article({
//     title: articleTitle,
//     content: articleContent,
//   });
//   articlePosted.save(function (err) {
//     if (!err) {
//       res.send("Successfully Added a new post");
//     } else {
//       res.send(err);
//     }
//   });
// });

// app.delete("/articles", function (req, res) {
//   Article.deleteMany()
//     .then(() => {
//       res.send("Successfully Deleted all articles");
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// Since the above code routing method target the same endpoint we can use express routing method to target the same endpoing and apply
// different http verbs on it the new verion of the above commented code could be.

app
  .route("/articles")
  .get((req, res) => {
    Article.find({})
      .then(function (articlesFound) {
        res.send(articlesFound);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .post(function (req, res) {
    const articleTitle = req.body.title;
    const articleContent = req.body.content;
    const articlePosted = new Article({
      title: articleTitle,
      content: articleContent,
    });
    articlePosted.save(function (err) {
      if (!err) {
        res.send("Successfully Added a new post");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany()
      .then(() => {
        res.send("Successfully Deleted all articles");
      })
      .catch((err) => {
        res.send(err);
      });
  });

//   In the bellow code we are going to route to retrieve a particular article from a list of articles depending on the endpoint provided
// for example if we make a get request to /articles/Gasore this will retrieve all articles related to Gasore this will work even on other http verbs

app
  .route("/articles/:articleTitle")
  .get(function (req, res) {
    const articleTitle = req.params.articleTitle;
    Article.findOne({ title: articleTitle })
      .then((matchingArticle) => {
        res.send(matchingArticle);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .put(function (req, res) {
    Article.update(
      { title: articleTitle },
      {
        title: articleTitle,
        content: req.body.content,
      },
      { overwrite: true }
    )
      .then(() => {
        console.log("successfully updated");
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .patch(function (req, res) {
    Article.update({ title: articleTitle }, { $set: req.body })
      .then(() => {
        res.send("successfully updated the given field");
      })
      .catch((error) => {
        res.send(error);
      });
  })

  .delete(function (req, res) {
    Article.deleteOne({ title: articleTitle })
      .then(() => {
        res.send("Post deleted successfully");
      })
      .catch((error) => {
        res.send(error);
      });
  });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// For more information you can look at appbrewery github: https://github.com/orgs/londonappbrewery/repositories?type=all
