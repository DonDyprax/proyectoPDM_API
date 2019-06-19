const mongoose = require('mongoose');
const Role = require('../models/role');

exports.roles_get_all = (req, res, next) => {
    Role.find()
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

exports.roles_create_role = (req, res, next) => {

    const newRole = new Role({
        _id: new mongoose.Types.ObjectId(),
        rol: req.body.rol
    });

    newRole
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Handling POST request to /roles',
                createdRole: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
};

exports.roles_get_role = (req, res, next) => {
    const id = req.params.roleId
    Role.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Role not found for provided ID"
            })
        } 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.roles_delete_role = (req, res, next) => {
    const id = req.body.roleId;
    Role.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};