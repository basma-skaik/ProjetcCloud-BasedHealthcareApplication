const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const db = require("../../db/models"); // Sequelize models
const PatientFile = require("../../db/models/PatientFile"); // Mongoose model
const Patient = db.Patient;
const Appointment = db.Appointment;
const Doctor = db.Doctor;
const User = db.User;
const Notification = db.Notification;
const MedicalAdvice = db.MedicalAdvice;

exports.registerPatientInformation = async (req, res) => {
  const userId = req.user.userId;
  const files = req.files;

  try {
    // Verify patient exists in SQL
    const patient = await Patient.findOne({ where: { userId } });
    if (!patient) {
      return res.status(404).send({ message: `Patient ${userId} not found` });
    }

    // Save files to MongoDB
    const filePromises = files.map(async (file) => {
      const newFile = new PatientFile({
        patientId: patient.uniquePatientId,
        fileName: file.originalname,
        mimeType: file.mimetype,
        fileSize: file.size,
        fileData: file.buffer, // Store binary data in MongoDB
      });

      await newFile.save();

      return {
        fileName: file.originalname,
        mimeType: file.mimetype,
        fileSize: file.size,
      };
    });

    const uploadedFiles = await Promise.all(filePromises);

    res.status(200).send({
      message: "Patient information updated successfully!",
      uploadedFiles,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).send({
      message: "Error updating patient",
      error: error.message || "Unknown error",
    });
  }
};

exports.getFile = async (req, res) => {
  try {
    const file = await PatientFile.findById(req.params.fileId);
    if (!file) {
      return res.status(404).send("File not found");
    }
    res.setHeader("Content-Type", file.mimeType);
    res.send(file.fileData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving file");
  }
};

exports.bookAppointment = async (req, res) => {
  const patientId = req.body.patientId;
  const doctorId = req.body.doctorId;
  const appointmentDate = req.body.appointmentDate;

  try {
    // Check if the patient exists
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res
        .status(404)
        .send({ message: `Patient ${patientId} not found` });
    }

    // Check if the doctor exists
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).send({ message: `Doctor ${doctorId} not found` });
    }

    // Fetch the doctor's email from the User table
    const doctorUser = await User.findByPk(doctor.userId);
    if (!doctorUser) {
      return res
        .status(404)
        .send({ message: `User for Doctor ${doctorId} not found` });
    }

    const doctorEmail = doctorUser.email;

    // Check for conflicting appointments
    const conflictingAppointment = await Appointment.findOne({
      where: {
        doctorId,
        appointmentDate,
      },
    });

    if (conflictingAppointment) {
      return res.status(400).send({
        message:
          "The selected time slot is already booked. Please choose another time.",
      });
    }

    // Create a new appointment
    const newAppointment = await Appointment.create({
      patientId,
      doctorId,
      appointmentDate,
      status: "pending", // Default status
    });

    // Send email to the doctor
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "basmahskaik@gmail.com",
        pass: "tinv ywhw bxux tozs", // Replace with your app password
      },
    });

    const mailOptions = {
      from: "basmahskaik@gmail.com",
      to: doctorEmail,
      subject: "New Appointment Booking",
      text: `Dear Dr. ${doctorUser.username},\n\nYou have a new appointment booked by Patient ID: ${patientId} on ${appointmentDate}.\n\nBest regards,\nHealth-care System`,
    };

    await transporter.sendMail(mailOptions);

    // Save notification to the database
    await Notification.create({
      userId: doctor.userId,
      message: `A new appointment was booked by Patient ID: ${patientId} on ${appointmentDate}.`,
      createdBy: 1,
    });

    res.status(201).send({
      message: "Appointment booked successfully! Email notification sent.",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).send({
      message: "An error occurred while booking the appointment",
      error: error.message || "Unknown error",
    });
  }
};

exports.searchDoctors = async (req, res) => {
  try {
    const { query } = req.query; // Get search query from request
    if (!query) {
      return res.status(400).send({ message: "Search query is required." });
    }

    // Search doctors by name or specialty
    const doctors = await Doctor.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "email"],
          where: {
            username: { [Op.like]: `%${query}%` },
          },
        },
      ],
      where: {
        specialtyId: { [Op.like]: `%${query}%` }, // Assuming specialtyId is a text column or match the specialty name
      },
    });

    if (!doctors.length) {
      return res.status(404).send({ message: "No doctors found." });
    }

    res.status(200).send({
      message: "Doctors retrieved successfully",
      doctors,
    });
  } catch (error) {
    console.error("Error searching doctors:", error);
    res.status(500).send({
      message: "An error occurred while searching for doctors",
      error: error.message || "Unknown error",
    });
  }
};

exports.getMedicalAdvice = async (req, res) => {
  try {
    // Fetch all medical advice
    const advices = await MedicalAdvice.findAll();

    if (!advices.length) {
      return res.status(404).send({ message: "No medical advice found." });
    }

    res.status(200).send({
      message: "Medical advice retrieved successfully",
      advices,
    });
  } catch (error) {
    console.error("Error retrieving medical advice:", error);
    res.status(500).send({
      message: "An error occurred while retrieving medical advice",
      error: error.message || "Unknown error",
    });
  }
};
