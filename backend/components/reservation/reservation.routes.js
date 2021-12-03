const express = require('express');
const { verifyToken } = require('../../middleware/authJwt');
const router = express.Router();

const { createReservation, getReservation } = require('./reservation.controller');

router.get('/:id', [verifyToken], getReservation);
router.post('/', [verifyToken], createReservation);

module.exports = router;
