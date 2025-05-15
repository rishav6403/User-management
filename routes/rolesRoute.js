const { handleRolesCreated } = require("../controllers/roles")

const express = require('express');

const router = express.Router();

router.post("/", handleRolesCreated);
module.exports = router;