const express = require('express');

const { create, view } = require('./flight.controller');
const { isAdmin, verifyToken } = require('../../middleware/authJwt');
const router = express.Router();
// router.post('/test/admin', [verifyToken, isAdmin], create);

router.post('/', [verifyToken, isAdmin], create);

module.exports = router;
