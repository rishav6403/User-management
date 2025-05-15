const express = require("express");
const router = express.Router();
const jobs = require("../models/jobs")
const fs = require("fs/promises")
const { checkForAuthentication, restrictTo } = require("../middlewares/auth");

router.get("/", checkForAuthentication, async (req, res) => {
    try {
        const allUsers = req.user.role;
        const query = (allUsers === "ADMIN" || allUsers === "NORMAL") ? {} : { createdBy: req.user._id }
        const alljobs = await jobs.find(query);
        return res.render("home", {
            jobs: alljobs,
            role:allUsers,
        });
    } catch (err) {
        return res.status(500).send("Server Error");

    }
});

router.get('/delete/:id', checkForAuthentication, restrictTo(["ADMIN", "Editor"]), async (req, res) => {
    try {
        fs.appendFile('logger.txt', `${Date.now()}:${req.url}: ${req.method} response recieved\n`)
    } catch (error) {
        console.error(error.message);
    }
    await jobs.findOneAndDelete({ _id: req.params.id })
    return res.status(401).redirect('/');
})

router.get('/edit/:id', checkForAuthentication, restrictTo(["ADMIN", "Editor"]), async (req, res) => {
    const job = await jobs.findOne({ _id: req.params.id });
    return res.render("edit", { job });
})

router.post('/update/:id',checkForAuthentication, restrictTo(["ADMIN", "Editor"]), async (req, res) => {
    const { company, job_title, experience_required_1, experience_required_2, salary } = req.body;
    await jobs.findOneAndUpdate({ _id: req.params.id }, { company, job_title, experience_required_1, experience_required_2, salary }, { new: true });
    return res.redirect("/");
})

router.get("/signup", (req, res) => {
    try {
        fs.appendFile('logger.txt', `${Date.now()}:${req.url}: ${req.method}: response recieved \n`)
    } catch (error) {
        console.error(error.message);
    }
    return res.render("signup");
});
router.get("/login", (req, res) => {
    try {
        fs.appendFile('logger.txt', `${Date.now()}:${req.url}: ${req.method}: response recieved \n`)
    } catch (error) {
        console.error(error.message);
    }
    return res.render("login");
});
router.get("/logout", (req, res) => {
    try {
        fs.appendFile('logger.txt', `${Date.now()}:${req.url}: ${req.method}: response recieved \n`)
    } catch (error) {
        console.error(error.message);
    }
    res.cookie("token", "");
    return res.redirect("/login")
})
router.get("/jobs", checkForAuthentication, restrictTo(["ADMIN", "Editor"]), (req, res) => {
    try {
        fs.appendFile('logger.txt', `${Date.now()}:${req.url}: ${req.method}: response recieved \n`)
    } catch (error) {
        console.error(error.message);
    }
    return res.render("jobs");
});

router.get("/roles", checkForAuthentication, restrictTo(["ADMIN"]), (req, res) => {
    try {
        fs.appendFile('logger.txt', `${Date.now()}:${req.url}: ${req.method}: response recieved \n`)
    } catch (error) {
        console.error(error.message);
    }
    return res.render("roles");
});



module.exports = router;
