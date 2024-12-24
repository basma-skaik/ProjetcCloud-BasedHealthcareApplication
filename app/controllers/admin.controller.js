const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
const db = require("../../db/models");
const User = db.User;
const Patient = db.Patient;
const Doctor = db.Doctor;

exports.approveUser = async (req, res) => {
  try {
    const userId = req.params.userId; //user that the admin will approve him
    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(404)
        .send({ message: `User ${user.userId} not found!` });
    }

    let uniqueId = null;
    if (user.roleId === 2) {
      //Doctor
      let isUnique = false;
      while (!isUnique) {
        uniqueId = Math.floor(100000 + Math.random() * 900000);

        const existingDoctor = await Doctor.findOne({
          where: { uniqueDoctorId: uniqueId },
        });

        if (!existingDoctor) {
          isUnique = true;
        }
      }
      user.username = `DOCTOR-${uniqueId}`;
      await Doctor.create({
        userId: user.userId,
        uniqueDoctorId: uniqueId,
        specialtyId: 1 || null, // Can be updated later
        createdBy: process.env.ADMIN_ID,
        updatedBy: process.env.ADMIN_ID,
      });
    } else if (user.roleId === 1) {
      //Patient
      let isUnique = false;
      while (!isUnique) {
        uniqueId = Math.floor(100000 + Math.random() * 900000);

        const existingPatient = await Patient.findOne({
          where: { uniquePatientId: uniqueId },
        });

        if (!existingPatient) {
          isUnique = true;
        }
      }

      user.username = `PATIENT-${uniqueId}`;
      await Patient.create({
        userId: user.userId,
        uniquePatientId: uniqueId,
        medicalHistory: null, // Can be updated later
        createdBy: process.env.ADMIN_ID,
        updatedBy: process.env.ADMIN_ID,
      });
    } else {
      return res.status(400).send({ message: "Unsupported roleId" });
    }

    // Update user fields
    user.isVerified = true;
    user.registrationStatus = "approved";
    await user.save();

    // Send email with the unique ID
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // user: process.env.EMAIL_USER || "basmahskaik@gmail.com",
        // pass: process.env.EMAIL_PASS || "tinv ywhw bxux tozs",
        user: "basmahskaik@gmail.com",
        pass: "tinv ywhw bxux tozs",
      },
      debug: true, // Output SMTP conversation to console
      logger: true, // Log information to console
    });

    transporter.verify((error, success) => {
      if (error) {
        console.error("Error connecting to SMTP server:", error);
      } else {
        console.log("SMTP connection successful!");
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "basmahskaik@gmail.com",
      to: user.email,
      subject: `Your Unique ID`,
      text: `Hello, your unique ID for login is: ${uniqueId}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({
      message: `User approved successfully! Unique ID: ${uniqueId}`,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
