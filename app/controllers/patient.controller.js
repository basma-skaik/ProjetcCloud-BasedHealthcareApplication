const db = require("../../db/models"); // Sequelize models
const PatientFile = require("../../db/models/PatientFile"); // Mongoose model

const Patient = db.Patient;

exports.registerPatientInformation = async (req, res) => {
  const userId = req.params.userId;
  const files = req.files;

  try {
    // Verify patient exists in SQL
    const patient = await Patient.findOne({ where: { userId } });
    if (!patient) {
      return res.status(404).json({ message: `Patient ${userId} not found` });
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

    res.status(200).json({
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
