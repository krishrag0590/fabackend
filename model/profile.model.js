const { mongoose } = require("../helper/db_conn");
const { profileSchema } = require("../schema/profile.schema");

const profileModel = new mongoose.model('profile', profileSchema);

module.exports = { profileModel }