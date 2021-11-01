const express = require('express');

const { create, view } = require('./flight.controller');
const { isAdmin, verifyToken } = require('../../middleware/authJwt');

const router = express.Router();

router.post('/', create);
router.post('/view', view);

module.exports = router;
