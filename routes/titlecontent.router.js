const TitleContentController = require("../controller/titlecontent.controller");

module.exports = (app) => {
    const titleContentController = new TitleContentController();

    app.get('/get_titlecontent/:customTitle', titleContentController.getTitleContent);
    app.post('/save_title_content', titleContentController.saveTitleContent);
}