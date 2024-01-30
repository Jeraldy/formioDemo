const mongoose = require('mongoose');
const commonModel = require('./common.model');

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Permission name is required!"]
    },
    ...commonModel
});

const Permission = mongoose.model('Permission', PermissionSchema);
module.exports = Permission;