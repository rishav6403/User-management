const Roles = require("../models/user")
const jobs = require("../models/jobs")
const fs = require("fs/promises")

async function handleRolesCreated(req, res) {
    try {
        fs.appendFile('logger.txt', `${Date.now()}:${req.url}: ${req.method} response recieved \n`)
    } catch (error) {
        console.error(error.message);
    }
    const { name, email, password, role } = req.body;
    await Roles.create({
        name,
        email,
        role,
        password,
    })
    return res.redirect("/roles");
}


async function handleJobsCreated(req, res) {
    try {
        fs.appendFile('logger.txt', `${Date.now()}:${req.url}: ${req.method} response recieved \n`)
    } catch (error) {
        console.error(error.message);
    }
    const { company, job_title, experience_required_1, experience_required_2, salary } = req.body;
    await jobs.create({
        company,
        job_title,
        experience_required_1,
        experience_required_2,
        salary,
        createdBy: req.user._id,
    })
    return res.redirect("/");
}


module.exports = {
    handleRolesCreated,
    handleJobsCreated,
}

