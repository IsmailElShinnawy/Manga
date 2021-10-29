const express = require('express');
const router = express.Router();
const { allAccess, userBoard, adminBoard } = require('./account.controller');
const { isAdmin, verifyToken } = require('../../middleware/authJwt');

router.get('/test/all', allAccess);
router.get('/test/admin', [verifyToken, isAdmin], adminBoard);
router.get('/test/user', [verifyToken], userBoard);

module.exports = router;
