const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "healthcare.appspot.com", // Replace with your bucket name
});

module.exports = admin;
