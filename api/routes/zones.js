const express = require('express');
const router = express.Router();
//const checkAuth = require('../middleware/check-auth');

const Zone = require('../models/zone');

const ZonesController = require('../controllers/zones');

//router.get('/', checkAuth, ReportsController.reports_get_all);

//router.post('/', checkAuth, ReportsController.reports_create_report);

router.get('/', ZonesController.zones_get_all);

router.post('/', ZonesController.zones_create_zone);

router.get('/:zoneId', ZonesController.zones_get_zone);

router.get('/delete/:zoneId', ZonesController.zones_delete_zone);

router.post('/update/:zoneId', )

router.get('/edit/:zoneId', (req, res, next) => {
    const id = req.params.zoneId
    const zone = Zone.findOne({_id: id});
    res.render('editZone', {
        id,
        zone
    });
});

module.exports = router;