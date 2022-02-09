const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cv: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guest", GuestSchema);
