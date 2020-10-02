const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// connect DB
mongoose.set("useUnifiedTopology", true);
const mongooseConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
	} catch (err) {
		console.error(err);
	}
};
mongooseConnect();
mongoose.Promise = global.Promise;

//Define routes
app.use("/pictures", require("./api/routes/pictures"));
app.use("/users", require("./api/routes/users"));
app.get("/", (req, res) => {
	res.send("Hello");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("server is running on" + port);
