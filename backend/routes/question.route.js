const express = require('express');

const router = express.Router();

const { createQuestion, deleteQuestion, getQuestions, getSingleQuestions } = require('../controllers/question.controller.js');

const protectRoute = require('../middlewares/protectRoute.js');

router.post("/create", protectRoute ,createQuestion);
router.delete("/delete/:id", protectRoute ,deleteQuestion);
router.get("/", protectRoute , getQuestions);
router.get("/:id", protectRoute , getSingleQuestions);

module.exports = router