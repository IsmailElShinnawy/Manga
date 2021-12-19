const express = require('express');
const { verifyToken } = require('../../middleware/authJwt');
const router = express.Router();

const {
  createReservation,
  getReservation,
  cancelReservation,
  getUserReservations,
  sendItineraryEmail,
} = require('./reservation.controller');

router.get('/', [verifyToken], getUserReservations);
router.delete('/:id', [verifyToken], cancelReservation);
router.get('/:id', [verifyToken], getReservation);
router.post('/', [verifyToken], createReservation);
router.get('/email/:id', [verifyToken], sendItineraryEmail);

module.exports = router;
