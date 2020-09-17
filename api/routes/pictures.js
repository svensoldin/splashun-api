const express = require("express");
const router = express.Router();
const Picture = require("../models/Picture");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// GET
//get all pictures
router.get("/", auth, async (req, res) => {
	try {
		const pictures = await Picture.find().sort({ date: -1 });
		res.json(pictures);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

// POST
// add a new picture
router.post("/", auth, async (req, res) => {
	try {
		const newPicture = new Picture({
			user: req.user,
			label: req.body.label,
			imageURL: req.body.imageURL,
		});
		const picture = await newPicture.save();
		res.status(200).redirect("/pictures");
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

// DELETE
// delete a picture
router.delete("/:id", auth, async (req, res) => {
	try {
		const picture = await Picture.findById(req.params.id);
		if (!picture) {
			return res.status(404).json("Picture not found");
		}
		if (picture.user.toString() !== req.user) {
			return res.status(401).json("Not authorized");
		}
		await picture.remove();
		return res.status(200).json("Picture deleted");
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
