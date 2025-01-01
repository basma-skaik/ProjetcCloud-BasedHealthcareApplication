const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const doctorController = require("../controllers/doctor.controller");

router.post(
  "/registerDoctorInformation/:userId",
  [authJwt.verifyToken, authJwt.checkDoctor],
  doctorController.registerDoctorInformation
);

router.put(
  "/appointments/:appointmentId/apply/:userId",
  [authJwt.verifyToken, authJwt.checkDoctor],
  doctorController.applyAppointment
);

router.get(
  "/patients/:userId",
  [authJwt.verifyToken, authJwt.checkDoctor],
  doctorController.getPatientsList
);

router.post(
  "/appointments/follow-up/:userId",
  [authJwt.verifyToken, authJwt.checkDoctor],
  doctorController.createFollowUpAppointment
);

router.post(
  "/diagnosis/:userId",
  [authJwt.verifyToken, authJwt.checkDoctor],
  doctorController.recordDiagnosis
);

module.exports = router;
