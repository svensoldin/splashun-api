const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
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
