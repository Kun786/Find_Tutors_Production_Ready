const stdModel = require('../models/stdModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function(req, res, next){
        stdModel.create({
            name: req.body.name,
            fname: req.body.fname,
            email: req.body.email,
            mobile: req.body.mobile,
            dob: req.body.dob,
            gender: req.body.gender,
            language: req.body.language,
            city: req.body.city,
            pic: req.body.pic,
            class: req.body.class,
            password: req.body.password,
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
        stdModel.findOne({email:req.body.email},function(err, stdinfo){
            if(err){
                next(err);
            }else{
                if(bcrypt.compareSync(req.body.password, stdinfo.password)){
                    const token = jwt.sign({id:stdinfo._id},"mysecretkey",{expiresIn: '1h'});
                    res.json({
                            status: "success",
                            message: "User Found",
                            data: {std: stdinfo, token: token}
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
        stdModel.find({}, function(err, result){
            if(err){
                next(err);
            }else{
                res.json(result);
            }
        });
    },
};