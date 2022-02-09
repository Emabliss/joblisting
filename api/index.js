const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

// Routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const jobRoute = require("./routes/jobs");
const guestRoute = require("./routes/guests");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, (setupMiddlewares) => {
  console.log("Connected to MongoDB");
});

// static files
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully.");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/guests", guestRoute);

app.listen(8800, () => {
  console.log("Backend running...");
});
