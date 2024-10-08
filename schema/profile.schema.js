const { mongoose } = require("../helper/db_conn");

const profileSchema = new mongoose.Schema({
    customTitle: {
        required: true,
        type: String
    },
    customHandle: {
        required: true,
        type: String
    },
})

module.exports = { profileSchema }