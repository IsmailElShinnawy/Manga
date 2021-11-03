const express = require('express');

const { create, view, searchFlights } = require('./flight.controller');
const { isAdmin, verifyToken } = require('../../middleware/authJwt');
const router = express.Router();

router.post('/', [verifyToken, isAdmin], create);
router.get('/', view);
router.post('/search', searchFlights);

module.exports = router;
