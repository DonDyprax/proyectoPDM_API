const express = require('express');
const router = express.Router();

const Report = require('../models/report')
const ReportsController = require('../controllers/reports')

router.get('/',  async (req, res, next) => {
    const reports = await Report.find()
    res.render('index', {
        reports
    });
});

module.exports = router;