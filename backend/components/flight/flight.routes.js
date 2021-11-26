const express = require('express');

const {
  create,
  view,
  updateFlight,
  searchFlights,
  deleteFlight,
  viewFlight,
} = require('./flight.controller');
const { isAdmin, verifyToken } = require('../../middleware/authJwt');
const router = express.Router();

router.post('/', [verifyToken, isAdmin], create);
router.get('/', [verifyToken, isAdmin], view);
router.post('/user/search', userSearchFlights);
router.put('/:id', [verifyToken, isAdmin], updateFlight);
router.post('/search', [verifyToken, isAdmin], searchFlights);
router.delete('/', [verifyToken, isAdmin], deleteFlight);
router.get('/details/:id',viewFlight);
router.get('/:id', [verifyToken], getFlightSeatInfo);

module.exports = router;
