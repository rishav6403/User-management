const User = require("../models/user")
const { setUser } = require("../service/auth")
const fs = require("fs/promises")

async function handleUserSignUp(req, res) {
    try {
        fs.appendFile('logger.txt', `${Date.now()}:${req.url}: ${req.method} response recieved \n`)
    } catch (error) {
        console.error(error.message);
    }
    const { name, email, password, role } = req.body;
    await User.create({
        name,
        email,
        role,
        password,
    })
    return res.redirect("/login");
}


async function handleUserLogin(req, res) {
    try {
        fs.appendFile('logger.txt', `${Date.now()}:${req.url}: ${req.method} response recieved \n`)
    } catch (error) {
        console.error(error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email, password })
    if (!user)
        return res.render("login", {
            error: "Invalid username or password"
        });

    const token = setUser(user);
    res.cookie("token", token, { expires: new Date(Date.now() + 86400000), httpOnly: true });
    return res.redirect("/");

}
async function handleGuestLogin(req, res) {
    const guestEmail = "Guest@jobs.com";
    const guestPassword = "Guest123"; // match what you saved in DB

    const user = await User.findOne({ email: guestEmail, password: guestPassword });
    if (!user) {
        return res.render("login", { error: "Guest account not found" });
    }

    const token = setUser(user); // token generation
    res.cookie("token", token, { expires: new Date(Date.now() + 86400000), httpOnly: true });
    return res.redirect("/"); // ✅ redirect to homepage
}



module.exports = {
    handleUserSignUp,
    handleUserLogin,
    handleGuestLogin
}