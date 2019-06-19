const express = require('express');
const router = express.Router();
//const checkAuth = require('../middleware/check-auth');

const ZonesController = require('../controllers/zones');

//router.get('/', checkAuth, ReportsController.reports_get_all);

//router.post('/', checkAuth, ReportsController.reports_create_report);

router.get('/', ZonesController.zones_get_all);

router.post('/', ZonesController.zones_create_zone);

router.get('/:zoneId', ZonesController.zones_get_zone);

router.delete('/:zoneId', ZonesController.zones_delete_zone);

module.exports = router;