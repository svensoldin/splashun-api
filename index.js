const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({ origin: true }));

// connect DB
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(express.json());

//Define routes
app.use("/pictures", require("./api/routes/pictures"));
app.use("/users", require("./api/routes/users"));
app.get("/", (req, res) => {
	res.send("Hello");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("server is running on" + port);
