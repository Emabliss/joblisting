const router = require("express").Router();
const Job = require("../models/Job");
const Guest = require("../models/Guest");

// CREATE JOB
router.post("/", async (req, res) => {
  const newJob = new Job(req.body);
  try {
    const savedJob = await newJob.save();
    res.status(200).json(savedJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE JOB
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job.userId === req.body.userId) {
      await job.updateOne({ $set: req.body });
      res.status(200).json("Job has been updated");
    } else {
      res.status(403).json("You can update only your job");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE JOB
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const applicants = await Promise.all(
      job.applications.map((applicantId) => {
        return Guest.findById(applicantId);
      })
    );
    if (job.userId === req.body.userId) {
      await job.deleteOne();
      res.status(200).json("Job has been deleted");
      if (applicants.length > 0) {
        const allJobs = await Job.find();
        for (applicant of applicants) {
          const check = allJobs.some((job) =>
            job.applications.includes(applicant._id)
          );
          if (!check) {
            await Guest.findByIdAndDelete(applicant._id);
          }
        }
      }
    } else {
      res.status(403).json("You can delete only your job");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL JOBS
router.get("/", async (req, res) => {
  try {
    const allJobs = await Job.find().sort({ createdAt: "desc" });
    res.status(200).json(allJobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET A JOB
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json(err);
  }
});

// APPLY FOR JOB
router.put("/:id/apply", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const guest = await Guest.findById(req.body.userId);
    if (!job.applications.includes(req.body.userId)) {
      await job.updateOne({ $push: { applications: req.body.userId } });
      res.status(200).json("Application sent!");
    } else {
      res.status(403).json("Already applied.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
