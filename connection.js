const mongoose = require("mongoose");

async function connectToMongoDB(user) {
    return mongoose.connect(user);
}
module.exports = {
    connectToMongoDB
}