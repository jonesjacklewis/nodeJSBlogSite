const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("db/blogApp.db", (err) => {
  if (err) {
    console.error(err.message);
  }
});

/* GET view page. */
router.get("/", function (req, res, next) {
  db.all(
    "SELECT postTitle, postBody, postAuthor, postDate FROM posts ORDER BY postDate;",
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.send(
          "<script>window.alert('Invalid Request');window.location.href='/'</script>"
        );
      } else {
        var posts = [];

        rows.forEach((row) => {
          posts.push({
            postTitle: row.postTitle,
            postBody: row.postBody,
            postAuthor: row.postAuthor,
            postDate: row.postDate,
          });
        });

        res.render("view", {
          title: "View Posts",
          signedIn: req.cookies.loggedIn !== undefined,
          username: req.cookies.loggedIn,
          posts: posts,
        });
      }
    }
  );
});

module.exports = router;
