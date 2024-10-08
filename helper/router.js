const userRouter = require("../routes/user.router")
const titleRouter = require("../routes/title.router");
const titlecontentRouter = require("../routes/titlecontent.router");
const profileRouter = require("../routes/profile.router");

module.exports = (app) => {
    userRouter(app);
    titleRouter(app);
    titlecontentRouter(app);
    profileRouter(app);
}