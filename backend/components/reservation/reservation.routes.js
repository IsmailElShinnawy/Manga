const express = require("express");
const { verifyToken } = require("../../middleware/authJwt");
const router = express.Router();

const {
  createReservation,
  getReservation,
  cancelReservation,
  getUserReservations,
  updateSeats,
} = require("./reservation.controller");

router.get("/", [verifyToken], getUserReservations);
router.delete("/:id", [verifyToken], cancelReservation);
router.get("/:id", [verifyToken], getReservation);
router.post("/", [verifyToken], createReservation);
router.put("/seats/:id", [verifyToken], updateSeats);

module.exports = router;
