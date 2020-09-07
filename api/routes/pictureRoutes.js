const express = require("express");
const router = express.Router();

// get all pictures
router.get("/", (req, res) => {
	res.send("GET");
});

//add a new picture
router.post("/", (req, res) => {
	res.send(req.body);
});

// delete a picture
router.delete("/", (req, res) => {
	res.send("DELETE");
});

module.exports = router;
