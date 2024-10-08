const { mongoose } = require("../helper/db_conn");
const { userSchema } = require("../schema/user.schema");

const userModel = new mongoose.model('user', userSchema);

module.exports = { userModel }