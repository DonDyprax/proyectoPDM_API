const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        if(user.length >= 1) {
            return res.status(409).json({
                message: "Username is already taken"
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
                        username: req.body.username,
                        password: hash
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
    User.find({username: req.body.username})
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
                        username: user[0].username,
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