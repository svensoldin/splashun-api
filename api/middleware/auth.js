const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) return res.status(401).json("Not authorized, no token");
	try {
		const decoded = jwt.verify(token, process.env.JWTSECRET);
		req.user = decoded.id;
		next();
	} catch (err) {
		console.error(err.message);
		res.status(500).json("Server error");
	}
};
