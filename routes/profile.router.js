const ProfileController = require("../controller/profile.controller");

module.exports = (app) => {
    const profileController = new ProfileController();

    app.post('/save_profile', profileController.saveProfile);
    app.get('/get_profile', profileController.getProfile);
}