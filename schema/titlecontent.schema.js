const { mongoose } = require("../helper/db_conn");

const titleContentSchema = new mongoose.Schema({
    customTitle: {
        required: true,
        type: String
    },
    titleContent: {
        required: true,
        type: String
    },
})

module.exports = { titleContentSchema }