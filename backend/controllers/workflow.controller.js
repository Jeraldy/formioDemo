const factory = require('./handle.factrory');
const WorkFlowModel = require('../models/workflow.model');

exports.CRUD = factory.CRUD(WorkFlowModel)
