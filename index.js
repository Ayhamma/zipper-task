const express = require("express");
const zlib = require("zlib");
const multer = require("multer");

const app = express();
const upload = multer();
const login = "ayham";

app.get("/login", (req, res) => {
  res.type("text/plain");
  res.send(login);
});

app.post("/zipper", upload.any(), (req, res) => {
  let input;

  if (req.files && req.files.length > 0) {
    input = req.files[0].buffer;
  } else {
    return res.status(400).send("no file");
  }

  zlib.gzip(input, (err, result) => {
    if (err) return res.status(500).send("error");

    res.setHeader("Content-Type", "application/gzip");
    res.setHeader("Content-Disposition", "attachment; filename=result.gz");
    res.send(result);
  });
});

const port = process.env.PORT || 3000;
app.listen(port);
