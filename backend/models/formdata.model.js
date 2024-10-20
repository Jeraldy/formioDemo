const mongoose = require('mongoose');
const commonModel = require('./common.model');

const FormDataSchema = new mongoose.Schema({
    formDataObject: {
        type: String,
        required: [true, 'Form formDataObject is required!'],
        trim: true
    },
    formId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Forms',
        required: true,
    },
    ...commonModel,
});

const FormData = mongoose.model('FormData', FormDataSchema);

module.exports = FormData;