const express = require("express");
const zlib = require("zlib");

const app = express();
const login = "ayham";

app.use(express.raw({ type: "*/*", limit: "10mb" }));

app.get("/login", function (req, res) {
  res.type("text/plain");
  res.send(login);
});

app.post("/zipper", function (req, res) {
  zlib.gzip(req.body, function (err, result) {
    if (err) {
      return res.status(500).send("error");
    }

    res.type("application/gzip");
    res.send(result);
  });
});

const port = process.env.PORT || 3000;
app.listen(port);
