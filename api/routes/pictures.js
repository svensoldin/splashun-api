const express = require("express");
const router = express.Router();
const Picture = require("../models/Picture");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// get all pictures
router.get("/", async (req, res) => {
	try {
		const pictures = await Picture.find().sort({ date: -1 });
		res.json(pictures);
	} catch (err) {
		res.status(500).send("Server error");
	}
});

// POST
// add a new picture
router.post("/", async (req, res) => {
	try {
		const { token } = req.body;
		const decodedToken = jwt.verify(token, process.env.JWTSECRET);
		const newPicture = new Picture({
			user: decodedToken.id,
			label: req.body.label,
			imageURL: req.body.url,
		});
		const picture = await newPicture.save();
		res.status(200).json(picture);
	} catch (err) {
		res.status(500).send("Server error");
	}
});

// delete a picture
router.delete("/:id", async (req, res) => {
	try {
		const picture = await Pictures.findById(req.params.id);
		if (!picture) {
			return res.status(404).json("Picture not found");
		}
		if (picture.user.toString() !== req.user.id) {
			return res.status(401).json("User not authorized");
		}
		await pictures.remove();
		return res.status(200).json("Picture deleted");
	} catch (err) {
		res.status(500).send("Server error");
	}
});

module.exports = router;
