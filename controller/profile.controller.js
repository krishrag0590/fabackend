const { profileModel } = require("../model/profile.model");

module.exports = class ProfileController {
    async saveProfile (req, res) {
        try {
            const { customTitle, customHandle } = req.body;
            const newProfile = new profileModel({ customTitle, customHandle });
            await profileModel.deleteMany({});
            await newProfile.save();
            res.status(201).send(newProfile);
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }

    async getProfile (req, res) {
        try {
            const profileData = await profileModel.find();
            res.status(200).send(profileData);
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }
}