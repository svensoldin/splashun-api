const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
	label: {
		type: String,
		required: true,
	},
	imageURL: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Picture", PictureSchema);
