const mongoose = require('mongoose');
const { dbURI } = require('./helper');

mongoose.connect(dbURI)
    .then(() => {
        console.log('DB Connected!');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = { mongoose }