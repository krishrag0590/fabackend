const TitleController = require("../controller/title.controller");

module.exports = (app) => {
    const titleController = new TitleController();

    app.post('/save_title', titleController.saveTitle);
    app.get('/get_titles', titleController.getTitles);
    app.delete('/delete_title/:id', titleController.deleteTitle);
}