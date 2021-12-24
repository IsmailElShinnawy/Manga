const express = require('express');
const { verifyToken } = require('../../middleware/authJwt');
const router = express.Router();
const { updateUserProfile, changePassword } = require('./account.controller');

router.put('/updateProfile', [verifyToken], updateUserProfile);
router.put('/changePassword', [verifyToken], changePassword);

module.exports = router;
