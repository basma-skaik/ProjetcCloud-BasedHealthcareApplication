const nodemailer = require("nodemailer");
const db = require("../../db/models");
const Doctor = db.Doctor;
const Patient = db.Patient;
const Appointment = db.Appointment;
const Notification = db.Notification;
const User = db.User;

exports.registerDoctorInformation = async (req, res) => {
  const userId = req.params.userId;
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
    const doctorId = req.params.userId;

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
    const userId = req.params.userId;

    // Fetch the doctorId using the userId
    const doctor = await db.Doctor.findOne({ where: { userId } });
    if (!doctor) {
      return res.status(404).send({ message: `Doctor ${userId} not found` });
    }
    const doctorId = doctor.doctorId;

    // Fetch all patients associated with this doctor
    const appointments = await db.Appointment.findAll({
      where: { doctorId },
      include: [
        {
          model: db.Patient,
          as: "patient",
          include: [
            {
              model: db.User,
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
