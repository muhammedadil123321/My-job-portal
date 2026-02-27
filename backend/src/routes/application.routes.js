const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const {
  createApplication,
  getEmployerApplications,
  getMyApplications,
  updateApplicationStatus
} = require("../controllers/application.controller");


/*
========================================
WORKER APPLY TO JOB
POST /api/applications/:jobId
========================================
*/
router.post(
  "/:jobId",
  authMiddleware,
  createApplication
);


/*
========================================
WORKER GET HIS APPLICATION HISTORY
GET /api/applications/my
========================================
*/
router.get(
  "/my",
  authMiddleware,
  getMyApplications
);


/*
========================================
EMPLOYER GET APPLICATIONS FOR HIS JOBS
GET /api/applications/employer
========================================
*/
router.get(
  "/employer",
  authMiddleware,
  getEmployerApplications
);


/*
========================================
EMPLOYER UPDATE APPLICATION STATUS
PUT /api/applications/:id/status
========================================
*/
router.put(
  "/:id/status",
  authMiddleware,
  updateApplicationStatus
);


/*
========================================
OPTIONAL (RECOMMENDED)
WORKER DELETE HIS APPLICATION HISTORY
========================================
*/
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const Application = require("../models/Application");

      const application = await Application.findOne({
        _id: req.params.id,
        worker: req.user.id
      });

      if (!application) {
        return res.status(404).json({
          message: "Application not found"
        });
      }

      await application.deleteOne();

      res.json({
        success: true,
        message: "Application deleted successfully"
      });

    }
    catch (error) {

      res.status(500).json({
        message: "Server error",
        error: error.message
      });

    }

  }
);


module.exports = router;