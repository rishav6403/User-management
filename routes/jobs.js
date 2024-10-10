const express = require("express")
const router = express.Router();
const { handleJobsCreated } = require("../controllers/roles");
const { checkForAuthentication } = require("../middlewares/auth")



router.post("/", checkForAuthentication, handleJobsCreated);
router.post("/")

module.exports = router;