const express = require("express");
const bodyParser = require("body-parser");
const router = require("./api/routes/pictureRoutes");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(router);

app.listen(port);

console.log("and baaack to you Johnny");
