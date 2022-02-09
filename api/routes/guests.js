const router = require("express").Router();
const Guest = require("../models/Guest");
const Job = require("../models/Job");

// CREATE GUEST USER
router.post("/", async (req, res) => {
  try {
    const newGuest = await new Guest({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      location: req.body.location,
      phone: req.body.phone,
      cv: req.body.cv,
    });
    const savedGuest = await newGuest.save();
    res.status(200).json(savedGuest);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL APPLICANTS
router.get("/applicants/:jobId", async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    const appliedGuests = await Promise.all(
      job.applications.map((applicantId) => {
        return Guest.findById(applicantId);
      })
    );
    let applicantsList = [];
    appliedGuests.map((appliedGuest) => {
      applicantsList.push(appliedGuest);
    });
    res.status(200).json(applicantsList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
