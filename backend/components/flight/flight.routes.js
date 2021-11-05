const express = require('express');

const { create, view, updateFlight, searchFlights } = require('./flight.controller');
const { isAdmin, verifyToken } = require('../../middleware/authJwt');
const router = express.Router();

router.post('/', [verifyToken, isAdmin], create);
router.get('/', view);
router.put('/:id', [verifyToken, isAdmin], updateFlight);
router.post('/search', searchFlights);

module.exports = router;
