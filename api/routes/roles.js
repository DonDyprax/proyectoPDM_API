const express = require('express');
const router = express.Router();

const RolesController = require('../controllers/roles');

router.get('/', RolesController.roles_get_all);

router.post('/', RolesController.roles_create_role);

router.get('/:roleId', RolesController.roles_get_role);

router.delete('/:roleId', RolesController.roles_delete_role);

module.exports = router;