const { titleModel } = require("../model/title.model");
const { titleContentModel } = require("../model/titlecontent.model");

module.exports = class TitleController {
    async saveTitle (req, res) {
        try {
            const { customTitle } = req.body;
            const rs = await titleModel.find({customTitle});
            if(rs.length > 0) {
                res.status(422).send(rs);
            } else {
                const newTitle = new titleModel({customTitle});
                await newTitle.save();
                res.status(201).send(newTitle);
            }        
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }

    async getTitles (req, res) {
        try {
            const titles = await titleModel.find();
            res.status(200).send(titles);
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }

    async deleteTitle (req, res) {
        try {
            const _id = req.params.id;
            let rs = await titleModel.find({_id});
            await titleContentModel.deleteOne({ customTitle: rs[0].customTitle });
            await titleModel.findByIdAndDelete(_id);
            res.status(204).end();
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }
}