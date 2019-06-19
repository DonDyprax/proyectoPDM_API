const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_get_all = (req, res,next) => {
    User.find()
    .populate('idRol')
    .exec()
    .then(docs => {
        console.log(docs);
        if(docs.length > 0) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message: "No entries found"
            });
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.user_signup = (req, res, next) => {
    User.find({mail: req.body.mail})
    .exec()
    .then(user => {
        if(user.length >= 1) {
            return res.status(409).json({
                message: "Email is already registered"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        password: hash,
                        gender: req.body.gender,
                        mail: req.body.mail,
                        idRol: req.body.idRol
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            message: "User created successfully"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    });
};

exports.user_login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                }
                if(result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    })
                }
                return res.status(401).json({
                    message: "Auth failed"
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};