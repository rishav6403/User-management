const { getUser } = require("../service/auth");

async function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if (!tokenCookie) return res.redirect("/login");

    const token = tokenCookie
    try {
        const user = await getUser(token);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect("/login");
        if (!roles.includes(req.user.role)) return res.end("UnAuthorized, Only Admin can access!")
        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo,
};
