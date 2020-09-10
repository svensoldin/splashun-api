const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

// connect DB
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
	`mongodb+srv://kikoplou:${process.env.PASSWORD}@mern.yy0tj.mongodb.net/splashunDB?retryWrites=true&w=majority`,
	{ useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

app.use(express.json());

//Define routes
app.use("/pictures", require("./api/routes/pictures"));
app.use("/users", require("./api/routes/users"));

app.listen(process.env.PORT || 3000);

console.log("aaaaand back to you Alex");
