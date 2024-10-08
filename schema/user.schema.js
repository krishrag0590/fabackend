const { mongoose } = require("../helper/db_conn");

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    userpwd: {
        required: true,
        type: String
    },
    verificationStatus: {
        required: true,
        type: String
    },
    verificationCode: {
        required: true,
        type: String
    }
})

module.exports = { userSchema }