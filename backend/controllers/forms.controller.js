const factory = require('./handle.factrory');
const FormsModel = require('../models/forms.model');

exports.CRUD = factory.CRUD(FormsModel)
