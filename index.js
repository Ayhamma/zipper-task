const express = require("express");
const zlib = require("zlib");
const multer = require("multer");

const app = express();
const upload = multer();
const login = "ayham";

app.get("/login", function (req, res) {
  res.type("text/plain");
  res.send(login);
});

app.post("/zipper", upload.single("file"), function (req, res) {
  if (!req.file) {
    return res.status(400).send("no file");
  }

  zlib.gzip(req.file.buffer, function (err, result) {
    if (err) {
      return res.status(500).send("error");
    }

    res.setHeader("Content-Type", "application/gzip");
    res.setHeader("Content-Disposition", "attachment; filename=result.gz");
    res.send(result);
  });
});

const port = process.env.PORT || 3000;
app.listen(port);
