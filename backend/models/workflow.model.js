const mongoose = require('mongoose');
const commonModel = require('./common.model');

const WorkFlowSchema = new mongoose.Schema({
    workflowObject: {
        type: String,
        required: [true, 'Workflow Object is required!'],
        trim: true
    },
    workflowName: {
        type: String,
        required: [true, 'Workflow Name is required!'],
        unique: true,
        trim: true
    },
    ...commonModel,
});

const WorkFlow = mongoose.model('WorkFlow', WorkFlowSchema);

module.exports = WorkFlow;