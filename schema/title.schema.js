const { mongoose } = require("../helper/db_conn");

const titleSchema = new mongoose.Schema({
    customTitle: {
        required: true,
        type: String
    },
})

module.exports = { titleSchema }