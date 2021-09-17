const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function (req, res, next) {
        adminModel.create({
            name: req.body.name,
            fname: req.body.fname,
            email: req.body.email,
            mobile: req.body.mobile,
            gender: req.body.gender,
            password: req.body.pass,
            cnic: req.body.cnic,
            address: req.body.address
        }, function (err, result) {
            if (err) { next(err); }
            else {
                res.json({
                    status: true,
                    message: "Admin Registered Successfully",
                    data: null
                });
            }
        });
    },
    login: function (req, res, next) {
        adminModel.findOne({ email: req.body.email }, function (err, admininfo) {
            if (err) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.password, admininfo.password)) {
                    const token = jwt.sign({ id: admininfo._id }, "mysecretkey", { expiresIn: '1h' });
                    res.json({
                        status: "success",
                        message: "User Found",
                        data: { admin: admininfo, token: token }
                    });
                } else {
                    res.json({
                        status: false,
                        message: "invalid user email/password",
                        data: null
                    });
                }
            }
        });
    },
};