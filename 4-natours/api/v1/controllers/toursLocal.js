const { readFileSync } = require('fs');
const { writeFile } = require('fs/promises');

const tours = JSON.parse(
  readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)
);

const validateTour = (req, res, next) => {
  const { name, price } = req.body;
  const numPrice = parseFloat(price);
  const err = {};

  if (!name) err.name = 'Name is required';
  if (isNaN(numPrice) || numPrice <= 0)
    err.price = 'Price must be a positive number';
  if (!price) err.price = 'Price is required';

  if (Object.keys(err).length)
    return res.status(400).json({ status: 'fail', data: err });

  next();
};

const findTourIndex = (_req, res, next, val) => {
  const id = parseInt(val, 10);
  res.locals.tourIndex = tours.findIndex((tour) => tour.id === id);

  if (res.locals.tourIndex !== -1) return next();

  res
    .status(404)
    .json({ status: 'fail', data: { id: 'No tour with specified ID exists' } });
};

const getAllTours = (_req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
};

const getTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { tours: tours[res.locals.tourIndex] } });
};

const createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const tour = { id, ...req.body };
  tours.push(tour);

  writeFile(
    `${__dirname}/../../dev-data/data/tours-simple.json`,
    JSON.stringify(tours)
  )
    .then(() => res.status(201))
    .catch(() => res.status(202))
    .finally(() => res.json({ status: 'success', data: { tour } }));
};

const updateTour = (req, res) => {
  const tourIndex = res.locals.tourIndex;
  tours[tourIndex] = { ...tours[tourIndex], ...req.body };
  const tour = tours[tourIndex];

  writeFile(
    `${__dirname}/../../dev-data/data/tours-simple.json`,
    JSON.stringify(tours)
  )
    .then(() => res.status(200))
    .catch(() => res.status(202))
    .finally(() => res.json({ status: 'success', data: { tour } }));
};

const deleteTour = (req, res) => {
  tours.splice(res.locals.tourIndex, 1);

  writeFile(
    `${__dirname}/../../dev-data/data/tours-simple.json`,
    JSON.stringify(tours)
  )
    .then(() => res.sendStatus(204))
    .catch(() => res.status(202))
    .finally(() => res.json({ status: 'success', data: null }));
};

module.exports = {
  validateTour,
  findTourIndex,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
