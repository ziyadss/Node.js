import { NextFunction, Request, Response } from 'express';
import TourModel from '../models/tour';

// TODO: stick to JSend specs

function aliasTopTours(req: Request, res: Response, next: NextFunction): void {
  res.locals.limit = '5';
  res.locals.sort = '-ratingsAverage,price';
  res.locals.fields = 'name,price,ratingsAverage,summary,difficulty';
  return next();
}

async function getAllTours(req: Request, res: Response): Promise<Response> {
  try {
    const {
      sort = '-createdAt',
      limit = '10',
      page = '1',
      fields = '-__v',
      ...filters
    } = {
      ...req.query,
      ...res.locals,
    };

    const filtersN = JSON.parse(
      JSON.stringify(filters).replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      )
    );

    const sortN = `${sort.replace(/,/g, ' ')} -createdAt`;

    const fieldsN = fields?.replace(/,/g, ' ');

    const pageN = parseInt(page, 10);
    const limitN = parseInt(limit, 10);
    const skipN = (pageN - 1) * limitN;

    const countQuery = await TourModel.countDocuments(filtersN);
    const query = TourModel.find(filtersN, fieldsN, {
      sort: sortN,
      skip: skipN,
      limit: limitN,
    });

    // const query = TourModel.find(filters)
    //   .select(fields)
    //   .sort(sort)
    //   .skip(skip)
    //   .limit(limit);

    // const query = TourModel.find()
    //   .where('difficulty')
    //   .equals('easy')
    //   .where('duration')
    //   .equals('5');

    const pages = Math.ceil(countQuery / limitN);
    const tours = await query;
    const results = tours.length;

    return tours.length === 0 && pageN > 1
      ? res.status(404).json({
          status: 'fail',
          data: { message: 'Page does not exist', pages },
        })
      : res
          .status(200)
          .json({ status: 'success', data: { results, pages, tours } });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : err,
    });
  }
}

async function getTour(req: Request, res: Response): Promise<Response> {
  try {
    const tour = await TourModel.findById(req.params.id);
    // findOne({ _id: req.params.id });
    return tour
      ? res.status(200).json({ status: 'success', data: { tour } })
      : res.status(404).json({
          status: 'fail',
          data: { _id: 'No tour with specified ID found' },
        });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : err,
    });
  }
}

async function createTour(req: Request, res: Response): Promise<Response> {
  try {
    const tour = await TourModel.create(req.body);
    return res.status(201).json({ status: 'success', data: { tour } });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: err instanceof Error ? err.message : err,
    });
  }
}

async function updateTour(req: Request, res: Response): Promise<Response> {
  try {
    const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
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
    return res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : err,
    });
  }
}

async function deleteTour(req: Request, res: Response): Promise<Response> {
  try {
    const tour = await TourModel.findByIdAndDelete(req.params.id);

    return tour
      ? res.sendStatus(204)
      : res.status(404).json({
          status: 'fail',
          data: { _id: 'No tour with specified ID found' },
        });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : err,
    });
  }
}

export {
  aliasTopTours,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
