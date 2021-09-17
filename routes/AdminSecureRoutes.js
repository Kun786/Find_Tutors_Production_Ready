const express = require('express');
const router = express.Router();

const parentAuthController = require("../app/api/controllers/parentsAuthController");
const stdAuthController = require("../app/api/controllers/stdAuthController");
const tutorAuthController = require("../app/api/controllers/tutorsAuthController");

router.get('/allParents', parentAuthController.find);
router.get('/allStds', stdAuthController.findAll);
router.get('/allTutors', tutorAuthController.findAll);

console.log("User Auth Router is Called");
module.exports = router;