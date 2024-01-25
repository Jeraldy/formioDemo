const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/app.error');
const APIFeatures = require('./../utils/api.features');

const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({ status: 'success', data: {} });
  });

const updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!data) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({ status: 'success', data });
  });

const createOne = Model =>
  catchAsync(async (req, res, next) => {
    if (req.user) {
      req.body.createdBy = req.user._id
    }
    const data = await Model.create(req.body);
    res.status(201).json({ status: 'success', data });
  });

const createMany = Model =>
  catchAsync(async (req, res, next) => {
    if (req.user) {
      req.body = req.body.map(item => ({ ...item, createdBy: req.user._id }))
    }
    const data = await Model.insertMany(req.body);
    res.status(201).json({ status: 'success', data });
  });

const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const data = await query;

    if (!data) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({ status: 'success', data });
  });

const getAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    // if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    let query = features.query
    if (popOptions) {
      query = query.populate(popOptions)
    };
    //const data = await features.query.explain();
    const data = await query;

    res.status(200).json({ status: 'success', results: data.length, data });
  });

const CRUD = (Model, popOptions) => ({
  create: createOne(Model),
  createMany: createMany(Model),
  update: updateOne(Model),
  delete: deleteOne(Model),
  getAll: getAll(Model, popOptions),
  getOne: getOne(Model, popOptions)
});

module.exports = {
  createMany,
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
  CRUD
};
