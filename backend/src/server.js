const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Job Portal API is running"
  });
});

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/test", require("./routes/test.routes"));
app.use("/api/role-test", require("./routes/role-test.routes"));
app.use("/api/jobs", require("./routes/job.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/worker-profile", require("./routes/workerProfile.routes"));
app.use("/api/employer-profile", require("./routes/employerprofile.routes"));
app.use("/api/applications", require("./routes/application.routes"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
