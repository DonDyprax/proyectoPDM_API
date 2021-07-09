const express = require('express');
const router = express.Router();
//const checkAuth = require('../middleware/check-auth');

const Report = require('../models/report')

const ReportsController = require('../controllers/reports');

//router.get('/', checkAuth, ReportsController.reports_get_all);

//router.post('/', checkAuth, ReportsController.reports_create_report);

router.get('/', ReportsController.reports_get_all);

router.post('/', ReportsController.reports_create_report);

router.put('/:reportId', (req, res, next) => {
    Report.findByIdAndUpdate(req.params.reportId, req.body, { new: true });
});

router.get('/:reportId', ReportsController.reports_get_report);

router.get('/delete/:reportId', ReportsController.reports_delete_report);

router.get('/edit/:reportId', (req, res, next) => {
    const {id} = req.params.reportId
    const report = Report.findById(id);
    res.render('edit', {
        report
    });
});

module.exports = router;