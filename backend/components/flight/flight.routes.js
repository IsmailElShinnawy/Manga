const express = require('express');

const { create, view } = require('./flight.controller');
const { isAdmin, verifyToken } = require('../../middleware/authJwt');
const router = express.Router();

router.get('/test/admin', [verifyToken, isAdmin], view);

router.get('/viewflights', view);
module.exports = router;