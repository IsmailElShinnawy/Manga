const express = require('express');

const {
  create,
  view,
  updateFlight,
  searchFlights,
  deleteFlight,
  userSearchFlights,
} = require('./flight.controller');
const { isAdmin, verifyToken } = require('../../middleware/authJwt');
const router = express.Router();

router.post('/', [verifyToken, isAdmin], create);
router.get('/', [verifyToken, isAdmin], view);
router.post('/user/search', userSearchFlights);
router.put('/:id', [verifyToken, isAdmin], updateFlight);
router.post('/search', [verifyToken, isAdmin], searchFlights);
router.delete('/', [verifyToken, isAdmin], deleteFlight);

module.exports = router;
