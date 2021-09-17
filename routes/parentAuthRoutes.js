const express = require('express');
const router = express.Router();

const parentAuthController = require("../app/api/controllers/parentsAuthController");

router.post('/register', parentAuthController.create);
router.post('/login', parentAuthController.login);

console.log("Parent Auth Router is Called");
module.exports = router;