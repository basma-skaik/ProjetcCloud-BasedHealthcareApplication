const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const db = require("../../db/models");
const Doctor = db.Doctor;
const Patient = db.Patient;
const Appointment = db.Appointment;
const Notification = db.Notification;
const User = db.User;
const Diagnosis = db.Diagnosis;

exports.registerDoctorInformation = async (req, res) => {
  const userId = req.user.userId;
  const specialtyId = req.body.specialtyId;

  try {
    const specialty = await Specialty.findByPk(specialtyId);
    if (!specialty) {
      return res
        .status(404)
        .send({ message: `Specialty ${specialtyId} not found` });
    }

    const doctor = await Doctor.findOne({ where: { userId } });
    if (!doctor) {
      return res.status(404).send({ message: `Doctor ${userId} not found` });
    }

    // Update the doctor's specialtyId
    doctor.specialtyId = specialtyId;
    doctor.updatedBy = doctor.userId;
    await doctor.save();
    res.status(200).send({
      message: "Doctor specialty updated successfully",
      doctor,
    });
  } catch (error) {
    console.error("Error updating doctor's specialty:", error);
    res.status(500).send({
      message: "An error occurred while updating the doctor's specialty",
      error: error.message || "Unknown error",
    });
  }
};

exports.applyAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    const doctorId = req.user.userId;

    // Find the appointment
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).send({ message: `Appointment not found` });
    }

    // Ensure the doctor is managing this appointment
    const doctor = await Doctor.findOne({ where: { userId: doctorId } });
    if (!doctor || doctor.doctorId !== appointment.doctorId) {
      return res
        .status(403)
        .send({ message: "Unauthorized access to the appointment" });
    }

    // Update appointment status to "approved"
    appointment.status = "approved";
    appointment.updatedBy = doctorId;
    await appointment.save();

    // Get the patient's email
    const patient = await Patient.findByPk(appointment.patientId, {
      include: [{ model: User, as: "user" }],
    });
    if (!patient) {
      return res
        .status(404)
        .send({ message: `Patient ${patient.userId} not found` });
    }
    const patientEmail = patient.user.email;

    // Send email notification to the patient
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "basmahskaik@gmail.com",
        pass: "tinv ywhw bxux tozs",
      },
    });

    const mailOptions = {
      from: "basmahskaik@gmail.com",
      to: patientEmail,
      subject: "Appointment Approved",
      text: `Dear ${patient.user.username},\n\nYour appointment on ${appointment.date} has been approved.\n\nBest regards,\nHealth-care System`,
    };

    await transporter.sendMail(mailOptions);

    // Save the email notification to the notifications table
    await Notification.create({
      userId: patient.userId,
      message: `Your appointment on ${appointment.date} has been approved.`,
      createdBy: 1,
    });

    res.status(200).send({
      message:
        "Appointment approved successfully, and notification sent to the patient.",
    });
  } catch (error) {
    console.error("Error applying appointment:", error);
    res.status(500).send({
      message: "An error occurred while applying the appointment",
      error: error.message || "Unknown error",
    });
  }
};

exports.getPatientsList = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch the doctorId using the userId
    const doctor = await Doctor.findOne({ where: { userId } });
    if (!doctor) {
      return res.status(404).send({ message: `Doctor ${userId} not found` });
    }
    const doctorId = doctor.doctorId;

    // Fetch all patients associated with this doctor
    const appointments = await Appointment.findAll({
      where: { doctorId },
      include: [
        {
          model: Patient,
          as: "patient",
          include: [
            {
              model: User,
              as: "user",
            },
          ],
        },
      ],
    });

    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .send({ message: "No patients found for this doctor" });
    }

    // Map unique patients from the appointments
    const uniquePatients = {};
    appointments.forEach((appointment) => {
      const patient = appointment.patient;
      if (patient && !uniquePatients[patient.patientId]) {
        uniquePatients[patient.patientId] = {
          patientId: patient.patientId,
          username: patient.user.username,
          email: patient.user.email,
        };
      }
    });

    // Convert uniquePatients object to an array
    const patientList = Object.values(uniquePatients);

    res.status(200).send({
      message: "Patients retrieved successfully",
      patients: patientList,
    });
  } catch (error) {
    console.error("Error retrieving patients list:", error);
    res.status(500).send({
      message: "An error occurred while retrieving the patients list",
      error: error.message || "Unknown error",
    });
  }
};

exports.createFollowUpAppointment = async (req, res) => {
  try {
    const { patientId, date, time, notes } = req.body;
    const doctorId = req.user.userId;

    // Validate patient
    const patient = await Patient.findByPk(patientId, {
      include: [{ model: User, as: "user" }],
    });
    if (!patient) {
      return res
        .status(404)
        .send({ message: `Patient ${patientId} not found` });
    }

    // Validate doctor
    const doctor = await Doctor.findOne({ where: { userId: doctorId } });
    if (!doctor) {
      return res.status(404).send({ message: `Doctor ${doctorId} not found` });
    }

    // Combine date and time into a single appointmentDate
    const appointmentDate = `${date} ${time}`;

    // Create follow-up appointment
    const appointment = await Appointment.create({
      patientId,
      doctorId: doctor.doctorId,
      appointmentDate, // Use combined appointmentDate
      status: "follow-up",
      createdBy: doctor.userId,
    });

    // Send email notification to the patient
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "basmahskaik@gmail.com",
        pass: "tinv ywhw bxux tozs",
      },
    });

    const mailOptions = {
      from: "basmahskaik@gmail.com",
      to: patient.user.email,
      subject: "Follow-Up Appointment Scheduled",
      text: `Dear ${patient.user.username},\n\nYour follow-up appointment has been scheduled for:\nDate: ${date}\nTime: ${time}\n\nNotes from your doctor: ${notes}\n\nBest regards,\nHealth-care System`,
    };

    await transporter.sendMail(mailOptions);

    // Save notification
    await Notification.create({
      userId: patient.userId,
      message: `Your follow-up appointment is scheduled for ${date} at ${time}.`,
      createdBy: 1,
    });

    res.status(201).send({
      message: "Follow-up appointment created and email sent successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error creating follow-up appointment:", error);
    res.status(500).send({
      message: "An error occurred while creating the follow-up appointment",
      error: error.message || "Unknown error",
    });
  }
};

exports.recordDiagnosis = async (req, res) => {
  try {
    const { patientId, diagnosis, treatment, prescription } = req.body;
    const doctorId = req.user.userId;

    // Validate patient
    const patient = await Patient.findByPk(patientId, {
      include: [{ model: User, as: "user" }],
    });
    if (!patient) {
      return res
        .status(404)
        .send({ message: `Patient ${patientId} not found` });
    }

    // Validate doctor
    const doctor = await Doctor.findOne({ where: { userId: doctorId } });
    if (!doctor) {
      return res.status(404).send({ message: `Doctor ${doctorId} not found` });
    }

    // Save diagnosis
    const diagnosisRecord = await Diagnosis.create({
      patientId,
      doctorId: doctor.doctorId,
      diagnosis,
      treatment,
      prescription,
      createdBy: doctor.userId,
    });

    // Send email notification to the patient
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "basmahskaik@gmail.com",
        pass: "tinv ywhw bxux tozs",
      },
    });

    const mailOptions = {
      from: "basmahskaik@gmail.com",
      to: patient.user.email,
      subject: "Diagnosis and Treatment Details",
      text: `Dear ${patient.user.username},\n\nDiagnosis: ${diagnosis}\nTreatment: ${treatment}\nPrescription: ${prescription}\n\nBest regards,\nHealth-care System`,
    };

    await transporter.sendMail(mailOptions);

    // Save notification
    await Notification.create({
      userId: patient.userId,
      message: `Diagnosis, treatment, and prescription details have been emailed to you.`,
      createdBy: 1,
    });

    res.status(201).send({
      message: "Diagnosis recorded and email sent to the patient",
      diagnosis: diagnosisRecord,
    });
  } catch (error) {
    console.error("Error recording diagnosis:", error);
    res.status(500).send({
      message: "An error occurred while recording the diagnosis",
      error: error.message || "Unknown error",
    });
  }
};

exports.searchPatients = async (req, res) => {
  try {
    const { query } = req.query; // Get search query from request
    if (!query) {
      return res.status(400).send({ message: "Search query is required." });
    }

    // Search patients by name or medical history
    const patients = await Patient.findAll({
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
        patientId: { [Op.like]: `%${query}%` },
      },
    });

    if (!patients.length) {
      return res.status(404).send({ message: "No patients found." });
    }

    res.status(200).send({
      message: "Patients retrieved successfully",
      patients,
    });
  } catch (error) {
    console.error("Error searching patients:", error);
    res.status(500).send({
      message: "An error occurred while searching for patients",
      error: error.message || "Unknown error",
    });
  }
};
