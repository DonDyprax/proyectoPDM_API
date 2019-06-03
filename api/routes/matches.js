const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth');

const Match = require('../models/match');

const MatchesController = require('../controllers/matches');

router.get('/', checkAuth, MatchesController.matches_get_all);

router.post('/', checkAuth, MatchesController.matches_create_match);

router.get('/:matchId', MatchesController.matches_get_match);

router.delete('/:matchId', MatchesController.matches_delete_match);

module.exports = router;