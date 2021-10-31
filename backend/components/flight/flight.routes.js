const express = require('express');

const router = express.Router();
const { deleteFlight } = require('./flight.controller');
const { isAdmin, verifyToken } = require('../../middleware/authJwt');


router.delete('/deleteFlight',[verifyToken, isAdmin], deleteFlight);



module.exports=router;
