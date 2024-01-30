const mongoose = require('mongoose');
const commonModel = require('./common.model');

const PermissionGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Permission name is required!"]
    },
    permissions:{
        type: Array
    },
    ...commonModel
});

const PermissionGroup = mongoose.model('PermissionGroup',PermissionGroupSchema);
module.exports = PermissionGroup;