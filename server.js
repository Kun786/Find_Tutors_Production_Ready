const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var jwt = require('jsonwebtoken');
const path = require('path');
app.use(bodyParser.urlencoded({extended: true}));
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 7000;

const mongoose = require("./config/database");
const stdAuthRouter = require("./routes/stdAuthRoutes");
const parentAuthRouter = require("./routes/parentAuthRoutes");
const tutorAuthRouter = require("./routes/tutorAuthRoutes");
const adminAuthRouter = require("./routes/adminAuthRoutes");
const adminSecureRoutes = require("./routes/AdminSecureRoutes");

app.use('/std', stdAuthRouter);
app.use('/parent', parentAuthRouter);
app.use('/tutor', tutorAuthRouter);
app.use('/admin', adminAuthRouter);
app.use('/secure', adminSecureRoutes);

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }
      
      else{
        console.log(decoded);
        // add user id to request
      
        req.body.userId = decoded.id;
        next();
      }
    });
    
  }
  app.use(express.static(path.join(__dirname, '/frontEnd')));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/frontEnd/index.html'));
  });
  

app.listen(port, function(err, res){
    console.log("Server is Running on 7000 Port");
})