const mongoose = require("mongoose");

const qrGenSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },

  qrCode: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("QRGen", qrGenSchema);
