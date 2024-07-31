const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const { tokenGenerator } = require('../generateTokenandsetCookies.js');

module.exports.signup = async (request, response) =>{
    const {password, email ,confirmPassword,username} = request.body;
    const userImage = request.files && request.files['userImage'] ? request.files['userImage'][0].path : null;

    
    if (!password || !email  || !username  || !confirmPassword) {
        return response.status(404).send({ error : "Please fill all required fields"})
    }
    if (password!== confirmPassword) {
        return response.status(404).send({ error : "Passwords do not match"})
    }
    const existingUser = await User.findOne({email,username})
    if (existingUser) {
        return response.status(404).send({ error : "User already exists"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = await User.create({email,password:hashedPassword, username, image: userImage ? userImage : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'})

    if (!newUser) {
        return response.status(404).send({ error: "User not created" })
    }

    tokenGenerator(newUser._id, response)

    const highestRankingUser = await User.findOne().sort('-ranking').exec();
    newUser.ranking = highestRankingUser ? highestRankingUser.ranking + 1 : 1;

    newUser.save();

    response.status(200).send(newUser)
}
module.exports.signin = async (request, response) =>{
    const { email, password } = request.body
    if (!email ||!password) {
        return response.status(404).send({ error : "Please fill all required fields"})
    }
    const user = await User.findOne({email})
    if (!user) {
        return response.status(404).send({ error : "User not found"})
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if (!isPasswordCorrect) {
        return response.status(404).send({ error : "Password or email is incorrect"})
    }
    tokenGenerator(user._id, response)
    response.status(200).send(user)
}
module.exports.signout = async (request, response) =>{
    try {
        response.cookie("jwt", "")
        response.status(200).send({ message : "User signed out"})
    } catch (error) {
        response.status(500).send({ error : error.message })
        console.log(`Error: ${error.message}`);
    }
}

module.exports.updateProfile = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const userId = req.userId;

        const updates = {};
        if (email) updates.email = email;
        if (username) updates.username = username;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }
        const userImage = req.files && req.files['userImage'] ? req.files['userImage'][0].path : null;

        updates.image = userImage 

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(400).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(`Error in updateProfile: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};