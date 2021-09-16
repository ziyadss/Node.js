import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import { NextFunction, Request, Response } from 'express';

interface Tour {
  id: number;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: [string];
  startDates: [string];
}

const tours: [Tour] = JSON.parse(
  readFileSync(`${__dirname}/../../../dev-data/data/tours-simple.json`, 'utf-8')
);

class BasicTourError {
  name?: string;

  price?: string;
}

function validateTour(req: Request, res: Response, next: NextFunction): void {
  const { name, price } = req.body;
  const numPrice = parseFloat(price);
  const err = new BasicTourError();

  if (!name) err.name = 'Name is required';
  if (Number.isNaN(numPrice) || numPrice <= 0)
    err.price = 'Price must be a positive number';
  if (!price) err.price = 'Price is required';

  if (Object.keys(err).length)
    res.status(400).json({ status: 'fail', data: err });
  else next();
}

function findTourIndex(
  _req: Request,
  res: Response,
  next: NextFunction,
  val: string
): void {
  const id = parseInt(val, 10);
  res.locals.tourIndex = tours.findIndex((tour) => tour.id === id);

  if (res.locals.tourIndex === -1)
    res.status(404).json({
      status: 'fail',
      data: { id: 'No tour with specified ID exists' },
    });
  else next();
}

function getAllTours(_req: Request, res: Response): void {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
}

function getTour(_req: Request, res: Response): void {
  res
    .status(200)
    .json({ status: 'success', data: { tours: tours[res.locals.tourIndex] } });
}

function createTour(req: Request, res: Response): void {
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
}

function updateTour(req: Request, res: Response): void {
  const { tourIndex } = res.locals;
  tours[tourIndex] = { ...tours[tourIndex], ...req.body };
  const tour = tours[tourIndex];

  writeFile(
    `${__dirname}/../../dev-data/data/tours-simple.json`,
    JSON.stringify(tours)
  )
    .then(() => res.status(200))
    .catch(() => res.status(202))
    .finally(() => res.json({ status: 'success', data: { tour } }));
}

function deleteTour(_req: Request, res: Response): void {
  tours.splice(res.locals.tourIndex, 1);

  writeFile(
    `${__dirname}/../../dev-data/data/tours-simple.json`,
    JSON.stringify(tours)
  )
    .then(() => res.sendStatus(204))
    .catch(() => res.status(202))
    .finally(() => res.json({ status: 'success', data: null }));
}

export {
  validateTour,
  findTourIndex,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
