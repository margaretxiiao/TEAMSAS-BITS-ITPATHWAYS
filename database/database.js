const mongoose = require("mongoose")

const MONGODBURL = process.env 

exports.connect = () => {
    mongoose.connect(mongodb_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then()
    .catch((error) => {
        console.log('DB connection FAILED');
        console.log(error);
        process.exit(1)
    })
}