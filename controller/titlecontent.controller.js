const { titleContentModel } = require("../model/titlecontent.model")

module.exports = class TitleContentController {
    async getTitleContent (req, res) {
        try {
            const customTitle = req.params.customTitle;
            const titlecontent = await titleContentModel.find({ customTitle });
            res.status(200).send(titlecontent);
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }

    async saveTitleContent (req, res) {
        try {
            const { customTitle, titleContent } = req.body;
            await titleContentModel.deleteOne({ customTitle: customTitle });
            const newTitleContent = new titleContentModel({customTitle, titleContent});
            await newTitleContent.save();
            res.status(201).send(newTitleContent);
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }
}