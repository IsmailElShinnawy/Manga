const express = require("express");
const router = express.Router();
const { isAdmin, verifyToken } = require("../../middleware/authJwt");
const { updateFlight } = require("./flight.controller");

router.put("/:id", [verifyToken, isAdmin], updateFlight);

module.exports = router;
