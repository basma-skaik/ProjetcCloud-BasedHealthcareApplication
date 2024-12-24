const db = require("../../db/models");
const config = require("../../config/auth.config");

const User = db.User;
const Doctor = db.Doctor;
const Patient = db.Patient;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      roleId: req.body.roleId,
      isVerified: false,
      registrationStatus: "pending",
    });

    res.status(201).send({
      message: `User registered successfully with username: ${user.username} !`,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      return res
        .status(404)
        .send({ message: `User ${req.body.username} Not found!` });
    }

    // Check if the account is verified
    if (!user.isVerified) {
      return res.status(403).send({ message: "Account not verified!" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res
        .status(401)
        .send({ accessToken: null, message: "Invalid Password!" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.userId }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    // Check the user's role and fetch additional information
    let additionalData = null;

    if (user.roleId === 2) {
      // Doctor
      const doctor = await Doctor.findOne({ where: { userId: user.userId } });
      if (doctor) {
        additionalData = {
          doctorId: doctor.doctorId,
          uniqueDoctorId: doctor.uniqueDoctorId,
          specialtyId: doctor.specialtyId,
        };
      }
    } else if (user.roleId === 1) {
      // Patient
      const patient = await Patient.findOne({ where: { userId: user.userId } });
      if (patient) {
        additionalData = {
          patientId: patient.patientId,
          uniquePatientId: patient.uniquePatientId,
          medicalHistory: patient.medicalHistory,
        };
      }
    } else if (user.roleId === 3) {
      // Admin
      additionalData = {
        message: "You are the admin!",
      };
    }
    // Set the Bearer token in the response header
    res.header("Authorization", `Bearer ${token}`);

    res.status(200).send({
      id: user.userId,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      accessToken: token,
      additionalData,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
