const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js')

const protectRoute = async (request, response, next) => {
    try {
        const token = request.cookies.jwt;
        if (!token) {
            return response.status(401).send({ error: "No token provided - Unauthorized user" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decode) {
            return response.status(401).send({ error: "Invalid token - Unauthorized user" });
        }

        const user = await User.findOne({ _id: decode._id });
        if (!user) {
            return response.status(401).send({ error: "User not found - Unauthorized user" });
        }

        request.user = user;
        request.userId = decode._id;

        next();
    } catch (error) {
        console.log(`Error in protectRoute middleware: ${error}`);
        response.status(500).send({ error: "Server error" });
    }
};

module.exports = protectRoute;