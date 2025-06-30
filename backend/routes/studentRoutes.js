const express = require('express');
const multer = require('multer');
const { createStudent } = require('../controllers/studentController');

const router = express.Router();
const upload = multer(); // no disk storage needed

router.post('/', createStudent); // no file middleware


module.exports = router;
