const express = require('express');
const { verifyToken } = require('../../middleware/authJwt');
const router = express.Router();

const {
  createReservation,
  getReservation,
  cancelReservation,
  getUserReservations,
  sendItineraryEmail,
  updateSeats,
  updateReservedFlight,
  getClientSecretForFullReservation,
  getClientSecretForUpdateReservation,
} = require('./reservation.controller');

router.get('/', [verifyToken], getUserReservations);
router.delete('/:id', [verifyToken], cancelReservation);
router.get('/:id', [verifyToken], getReservation);
router.post('/', [verifyToken], createReservation);
router.get('/email/:id', [verifyToken], sendItineraryEmail);
router.put('/seats/:id', [verifyToken], updateSeats);
router.put('/:id', [verifyToken], updateReservedFlight);
router.post('/full-reservation-payment-secret', getClientSecretForFullReservation);
router.post(
  '/:id/update-reservation-payment-secret',
  [verifyToken],
  getClientSecretForUpdateReservation
);

module.exports = router;
