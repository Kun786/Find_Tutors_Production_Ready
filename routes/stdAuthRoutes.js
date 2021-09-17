const express = require('express');
const router = express.Router();

const stdAuthController = require("../app/api/controllers/stdAuthController");

router.post('/register', stdAuthController.create);
router.post('/login', stdAuthController.login);

console.log("User Auth Router is Called");
module.exports = router;