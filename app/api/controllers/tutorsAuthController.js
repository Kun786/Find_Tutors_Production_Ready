const tutorsModel = require('../models/tutorsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function(req, res, next){
        tutorsModel.create({
            name: req.body.name,
            fname: req.body.fname,
            email: req.body.email,
            mobile: req.body.mobile,
            dob: req.body.dob,
            gender: req.body.gender,
            language: req.body.language,
            city: req.body.city,
            pic: req.body.pic,
            lec: req.body.lec,
            password: req.body.password,
            experience: req.body.experience,
            qualification: req.body.qualification,
            description: req.body.description,
            address: req.body.address
        }, function(err, result){
            if(err){next(err);}
            else{
                res.json({
                    status: true,
                    message: "User Added Successfully",
                    data: null
                });
            }
        });
    },
    login: function(req, res, next){
        tutorsModel.findOne({email:req.body.email},function(err, tutorinfo){
            if(err){
                next(err);
            }else{
                if(bcrypt.compareSync(req.body.password, tutorinfo.password)){
                    const token = jwt.sign({id:tutorinfo._id},"mysecretkey",{expiresIn: '1h'});
                    res.json({
                            status: "success",
                            message: "User Found",
                            data: {tutor: tutorinfo, token: token}
                        });
                }else{
                    res.json({
                        status: false,
                        message: "invalid user email/password",
                        data: null
                    });
                }
            }
        });
    },
    findAll: function(req, res, next) {
        tutorsModel.find({}, function(err, result){
            if(err){
                next(err);
            }else{
                res.json(result);
            }
        });
    }
};