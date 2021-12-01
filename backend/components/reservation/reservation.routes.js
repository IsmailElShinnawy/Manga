const express = require('express');
const { verifyToken } = require('../../middleware/authJwt');
const router = express.Router();

const { createReservation } = require('./reservation.controller');

router.post('/', [verifyToken], createReservation);

module.exports = router;
