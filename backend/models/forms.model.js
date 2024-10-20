const mongoose = require('mongoose');
const commonModel = require('./common.model');

const FormsSchema = new mongoose.Schema({
    formObject: {
        type: String,
        required: [true, 'Form Object is required!'],
        trim: true
    },
    formName: {
        type: String,
        required: [true, 'Form Name is required!'],
        unique: true,
        trim: true
    },
    ...commonModel,
});

const Forms = mongoose.model('Forms', FormsSchema);

module.exports = Forms;