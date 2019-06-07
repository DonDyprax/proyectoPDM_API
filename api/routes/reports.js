const express = require('express');
const router = express.Router();
//const checkAuth = require('../middleware/check-auth');

const ReportsController = require('../controllers/reports');

//router.get('/', checkAuth, ReportsController.reports_get_all);

//router.post('/', checkAuth, ReportsController.reports_create_report);

router.get('/', ReportsController.reports_get_all);

router.post('/', ReportsController.reports_create_report);

router.get('/:reportId', ReportsController.reports_get_report);

router.delete('/:reportId', ReportsController.reports_delete_report);

module.exports = router;