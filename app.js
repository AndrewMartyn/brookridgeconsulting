const express = require("express");
const path = require("path");

const HOST = "127.0.0.1";
const PORT = 8000;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.listen(PORT, HOST, () => {
  console.log(`Running Server on ${HOST}:${PORT}`);
});
