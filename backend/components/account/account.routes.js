const express = require('express');
const { verifyToken } = require('../../middleware/authJwt');
const router = express.Router();
const { updateUserProfile } = require('./account.controller');

router.put('/updateProfile', [verifyToken], updateUserProfile);

module.exports = router;
