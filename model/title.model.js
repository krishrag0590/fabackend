const { mongoose } = require("../helper/db_conn");
const { titleSchema } = require("../schema/title.schema");

const titleModel = new mongoose.model('title', titleSchema);

module.exports = { titleModel }