const mongoose = require("mongoose");

const PatientFileSchema = new mongoose.Schema({
  patientId: {
    type: Number, // Match Sequelize's INTEGER type
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  fileData: {
    type: Buffer, // Optional: store binary data
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PatientFile", PatientFileSchema);
