const admin = require("../../firebase"); // Adjust path to match your project structure
const { v4: uuidv4 } = require("uuid");
const db = require("../../db/models");

const Patient = db.Patient;

exports.registerPatientInformation = async (req, res) => {
  const userId = req.params.userId;
  const files = req.files;

  try {
    const patient = await Patient.findOne({ where: { userId } });
    if (!patient) {
      return res.status(404).json({ message: `Patient ${userId} not found` });
    }

    const bucket = admin.storage().bucket();
    const uploadPromises = files.map(async (file) => {
      const uniqueFileName = `${uuidv4()}-${file.originalname}`;
      const fileUpload = bucket.file(uniqueFileName);

      await fileUpload.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });

      return {
        name: file.originalname,
        url: `https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`,
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

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
