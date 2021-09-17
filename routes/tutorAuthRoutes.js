const express = require('express');
const router = express.Router();

const tutorAuthController = require("../app/api/controllers/tutorsAuthController");

router.post('/register', tutorAuthController.create);
router.post('/login', tutorAuthController.login);

console.log("Tutor Auth Router is Called");
module.exports = router;