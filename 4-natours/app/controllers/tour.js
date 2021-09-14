const Tour = require('../models/tour');
// TODO: stick to JSend specs
async function getAllTours(_req, res) {
  try {
    const tours = await Tour.find();
    if (tours)
      return res
        .status(200)
        .json({ status: 'success', data: { results: tours.length, tours } });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

async function getTour(req, res) {
  try {
    const tour = await Tour.findById(req.params.id);
    // findOne({ _id: req.params.id });
    if (tour)
      return res.status(200).json({ status: 'success', data: { tour } });
    else
      return res.status(404).json({
        status: 'fail',
        data: { _id: 'No tour with specified ID found' },
      });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

async function createTour(req, res) {
  try {
    const tour = await Tour.create(req.body);
    return res.status(201).json({ status: 'success', data: { tour } });
  } catch (err) {
    return res.status(400).json({ status: 'error', message: err.message });
  }
}

async function updateTour(req, res) {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return tour
      ? res.status(200).json({ status: 'success', data: { tour } })
      : res.status(404).json({
          status: 'fail',
          data: { _id: 'No tour with specified ID found' },
        });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

async function deleteTour(req, res) {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    return tour
      ? res.sendStatus(204)
      : res.status(404).json({
          status: 'fail',
          data: { _id: 'No tour with specified ID found' },
        });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
