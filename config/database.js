const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/findTutor', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.log("there is an error in db connection "+ err);
    }else{
        console.log("Database Collection Build");
        console.log("findTutor DB is Used");
    }
});