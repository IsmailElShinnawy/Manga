const express = require('express');

const router = express.Router();
const { deleteFlight,createFlight } = require('./flight.controller');
const { isAdmin, verifyToken } = require('../../middleware/authJwt');


router.delete('/',[verifyToken, isAdmin], deleteFlight);
router.get('/createFlight',createFlight);


module.exports=router;
