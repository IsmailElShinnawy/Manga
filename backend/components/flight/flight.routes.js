const express = require('express');

const {
  create,
  view,
  updateFlight,
  searchFlights,
  deleteFlight,
  returnFlights,
} = require('./flight.controller');
const { isAdmin, verifyToken } = require('../../middleware/authJwt');
const router = express.Router();

router.post('/', [verifyToken, isAdmin], create);
router.get('/', [verifyToken, isAdmin], view);
router.put('/:id', [verifyToken, isAdmin], updateFlight);
router.post('/search', [verifyToken, isAdmin], searchFlights);
router.delete('/', [verifyToken, isAdmin], deleteFlight);
router.post('/return/:id', returnFlights);

module.exports = router;
