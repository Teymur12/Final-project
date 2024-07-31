const jwt = require('jsonwebtoken');

module.exports.tokenGenerator = (_id, response) => {
    const token = jwt.sign({_id}, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'
    })
    response.cookie("jwt", token), {
        maxAge: 1000 * 60 * 60 * 24 * 15
    }
}