const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("db/blogApp.db", (err) => {
  if (err) {
    console.error(err.message);
  }
});

/* GET create page. */
router.get("/", function (req, res, next) {
  res.render("create", {
    title: "Create New Post",
    signedIn: req.cookies.loggedIn !== undefined,
    username: req.cookies.loggedIn,
  });
});

router.post("/create", function (req, res, next) {
  const requestBody = req.body;

  if (
    "postTitle" in requestBody &&
    "postBody" in requestBody &&
    "username" in requestBody
  ) {
    const postTitle = requestBody["postTitle"];
    const postBody = requestBody["postBody"];
    const username = requestBody["username"];
    let today = new Date();
    const postDate = today.toISOString().split("T")[0];

    db.run(
      "INSERT INTO posts VALUES (null, ?, ?, ?, ?);",
      [postTitle, postBody, username, postDate],
      (err) => {
        if (err) {
          console.error(err);
          db.kill();
          res.send(
            "<script>window.alert('No blog post sent');window.location.href='/'</script>"
          );
        } else {
          db.kill();
          res.send(
            "<script>window.alert('Blog Post Created');window.location.href='/'</script>"
          );
        }
      }
    );
  } else {
    res.send(
      "<script>window.alert('No blog post sent');window.location.href='/'</script>"
    );
  }
});

router.get("/create", function (req, res, next) {
  res.send(
    "<script>window.alert('No blog post sent');window.location.href='/'</script>"
  );
});

module.exports = router;
