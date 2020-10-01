const express = require("express");
const router = express.Router();
const Picture = require("../models/Picture");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST
// register a new user

router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;

		//Check if user already exists
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json("User already exists");
		}

		user = new User({
			name,
			email,
			password,
		});
		//Encrypt password
		user.password = await bcrypt.hash(password, 10);
		await user.save();
		const payload = {
			id: user.id,
		};
		const token = jwt.sign(payload, process.env.JWTSECRET, {
			expiresIn: 60 * 1000 * 10,
		});
		res.status(200).json(token);
	} catch (err) {
		console.error(err);
		res.status(500).json(err.message);
	}
});

// POST
// Sign in

router.options("/signin", function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.end();
});

router.post("/signin", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.json("Wrong credentials");
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.json("Wrong credentials");
		}
		const payload = {
			id: user.id,
		};
		const token = jwt.sign(payload, process.env.JWTSECRET, {
			expiresIn: 1000 * 60 * 10,
		});
		res.status(200).json(token);
	} catch (err) {
		res.status(500).json("Server error");
	}
});

module.exports = router;
