const express = require("express");

const {
  create,
  view,
  updateFlight,
  searchFlights,
  deleteFlight,
  getFlightSeatInfo,
} = require("./flight.controller");
const { isAdmin, verifyToken } = require("../../middleware/authJwt");
const router = express.Router();

router.get("/:id", [verifyToken], getFlightSeatInfo);
router.post("/", [verifyToken, isAdmin], create);
router.get("/", [verifyToken, isAdmin], view);
router.put("/:id", [verifyToken, isAdmin], updateFlight);
router.post("/search", [verifyToken, isAdmin], searchFlights);
router.delete("/", [verifyToken, isAdmin], deleteFlight);

module.exports = router;
