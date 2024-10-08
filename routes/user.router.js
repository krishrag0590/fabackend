const UserController = require("../controller/user.controller");

module.exports = (app) => {
    const userController = new UserController();

    app.post('/create_user', userController.createUser);
    app.post('/change_password', userController.changePassword);
    app.post('/send_email', userController.sendEmail);
    app.post('/login', userController.login);
    app.get('/verify_email/:id', userController.verify_email);
    app.get('/get_users', userController.getUsers);
    app.put('/update_user/:id', userController.updateUser);
    app.delete('/delete_user/:id', userController.deleteUser);
    app.post('/signout', userController.signout);
    app.get('/verify_session/:email', userController.verifySession);
}