const { sendEmail, adminEmail, baseURL, baseUrlAPI } = require("../helper/helper");
const { userModel } = require("../model/user.model");

module.exports = class UserController {
    async createUser(req, res) {
        try {
            const verificationStatus = "0";
            const verificationCode = "0";
            const { email, userpwd } = req.body;
    
            const user = await userModel.find({email});
            if(user.length > 0) {
                res.status(500).send(user);
            } else {
                const newUser = new userModel({ email, userpwd, verificationStatus, verificationCode });
                await newUser.save();
                res.status(201).send(newUser);
                let emailContent = `Click here ${baseUrlAPI}verify_email/${(newUser._id).toString()} to verify email`;
                let rsSendEmail = sendEmail(email, emailContent);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }

    async changePassword (req, res) {
        try {
            const { id, userpwd } = req.body;
            const user = await userModel.find({_id: id});
            if(user.length > 0) {
                const updateUser = await userModel.updateOne( { _id: id }, { $set: { userpwd: userpwd, verificationStatus: "1" } } );
                res.status(201).send(updateUser);
            } else {
                res.status(500).send(user);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }

    async sendEmail (req, res) {
        try {
            const { email } = req.body;
            const user = await userModel.find({email});
            if(user.length > 0) {
                let emailContent = `Click here ${baseURL}resetpassword/${(user[0]._id).toString()} to reset password`;
                let rsSendEmail = await sendEmail(email, emailContent);
                res.status(200).send("Email send successfully");
            } else {
                res.status(500).send(user);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }

    async login (req, res) {
        try {
            const verificationStatus = "0";
            const verificationCode = "1";
            const { email, userpwd } = req.body;
    
            const rs = await userModel.find({$and:[{"email": email},{"userpwd": userpwd}]});            
            if(rs.length > 0) {
                if(rs[0].verificationStatus == 1) {
                    await userModel.updateOne( { email: email }, { $set: { verificationCode: "1" } } );
                    if(adminEmail == email) {
                        res.status(200).send({message: "success", flag: 2});
                    } else {
                        res.status(200).send({message: "success", flag: 1});
                    }
                } else {
                    res.status(406).send({message: "Email not verified", flag: 0});
                }
            } else {
                res.status(401).send({message: "invalid", flag: 0});
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message, flag: 0});
        }
    }

    async verify_email (req, res) {
        try {
            const id = req.params.id;
            const updateUser = await userModel.findByIdAndUpdate(
                id,
                { verificationStatus: "1" },
                { new: true }
            );
            if(updateUser.verificationStatus == 1) {
                res.status(200).send(`<div style="margin: auto;width: 60%;margin-top: 10%;border: 3px solid #73AD21;padding: 10px;"><p style="text-align: center">Email Id successfully verified. <a href="${baseURL}">Click here to login</a></p></div>`);
            } else {
                res.status(401).send({message: "Unauthorized"});
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }

    async getUsers (req, res) {
        try {
            const users = await userModel.find();
            res.status(200).send(users);
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }

    async updateUser (req, res) {
        try {
            const { username, userpwd } = req.body;
            const id = req.params.id;
            const updateUser = await userModel.findByIdAndUpdate(
                id,
                { username, userpwd },
                { new: true }
            );
            if(!updateUser) {
                return res.status(404).send({message: "user not found"});
            }
            res.status(200).send(updateUser);
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }

    async deleteUser (req, res) {
        try {
            const id = req.params.id;
            await userModel.findByIdAndDelete(id);
            res.status(204).end();
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }

    async signout (req, res) {
        try {
            const { email } = req.body;
            await userModel.updateOne( { email: email }, { $set: { verificationCode: "0" } } );
            res.status(200).send({message: "success"});
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }

    async verifySession (req, res) {
        try {
            const email = req.params.email;
            const rs = await userModel.find({ email });
            res.status(200).send(rs[0].verificationCode);
        } catch (err) {
            console.log(err);
            res.status(500).send({message: err.message});
        }
    }
}