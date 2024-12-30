const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    const mongoURI =
      "mongodb+srv://basmahskaik:basma@patients.btxxo.mongodb.net/?retryWrites=true&w=majority&appName=patients" ||
      process.env.MONGO_URI; // Ensure MONGO_URI is set in your .env file
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectMongoDB;
