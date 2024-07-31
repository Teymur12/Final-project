const express = require('express')

const router = express.Router()

const { signin, signout, signup, updateProfile } = require('../controllers/auth.controller.js');


router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.post('/update', updateProfile)


module.exports = router;