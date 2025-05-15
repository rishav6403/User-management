const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8080;
const mongodb = process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/test";

const { connectToMongoDB } = require("./connection")
const staticRoute = require("./routes/staticRoute");
const rolesRoute = require("./routes/rolesRoute")
const jobsRoute = require("./routes/jobs")
const userRoute = require("./routes/user")

app.use(express.json());

app.use(cookieParser())
app.use(express.static("views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/roles", rolesRoute);
app.use("/jobs", jobsRoute);


connectToMongoDB(mongodb).then(() => {
    console.log("Mongo db connected");
});

app.listen(PORT, () => { console.log(`Server started at ${PORT}`); })