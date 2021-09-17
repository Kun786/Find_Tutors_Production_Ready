const express = require('express');
const router = express.Router();

const adminAuthController = require("../app/api/controllers/adminAuthController");

router.post('/register', adminAuthController.create);
router.post('/login', adminAuthController.login);

console.log("User Auth Router is Called");
module.exports = router;