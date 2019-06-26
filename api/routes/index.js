const express = require('express');
const router = express.Router();

const Report = require('../models/report')
const Zone = require('../models/zone')

const ReportsController = require('../controllers/reports')

router.get('/',  async (req, res, next) => {
    const reports = await Report.find()
    const zones = await Zone.find()
    res.render('index', {
        reports,
        zones
    });
});

module.exports = router;