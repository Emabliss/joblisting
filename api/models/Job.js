const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      min: 10,
    },
    benefits: {
      type: String,
    },
    type: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: true,
    },
    company_logo: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    salary: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },

    applications: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
