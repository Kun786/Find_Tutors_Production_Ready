const parentsModel = require('../models/parentsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function(req, res, next){
        parentsModel.create({
            name: req.body.name,
            fname: req.body.fname,
            email: req.body.email,
            mobile: req.body.mobile,
            dob: req.body.dob,
            gender: req.body.gender,
            language: req.body.language,
            city: req.body.city,
            pic: req.body.pic,
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
        parentsModel.findOne({email:req.body.email},function(err, parentinfo){
            if(err){
                next(err);
            }else{
                if(bcrypt.compareSync(req.body.password, parentinfo.password)){
                    const token = jwt.sign({id:parentinfo._id},"mysecretkey",{expiresIn: '1h'});
                    res.json({
                            status: "success",
                            message: "User Found",
                            data: {parent: parentinfo, token: token}
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
    find: function(req, res, next) {
        parentsModel.find({}, function(err, result){
            if(err){
                next(err);
            }else{
                res.json(result);
            }
        });
    }
};