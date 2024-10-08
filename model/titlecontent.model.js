const { mongoose } = require("../helper/db_conn");
const { titleContentSchema } = require("../schema/titlecontent.schema");

const titleContentModel = new mongoose.model('titlecontent', titleContentSchema);

module.exports = { titleContentModel }