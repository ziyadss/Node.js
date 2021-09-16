import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import mongoose from 'mongoose';
import TourModel from '../api/v1/models/tour';

dotenv.config();

const DB_STRING = process.env.DB_STRING as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;

const connPromise = mongoose.connect(
  DB_STRING.replace('<password>', DB_PASSWORD)
);

const tours = JSON.parse(
  readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8')
);

async function importData() {
  try {
    await TourModel.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.error('Error: ', err);
  }
  connPromise.then((conn) => conn.disconnect());
}

async function deleteData() {
  try {
    await TourModel.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.error('Error: ', err);
  }
  connPromise.then((conn) => conn.disconnect());
}

switch (process.argv[2]) {
  case '--import':
    importData();
    break;

  case '--delete':
    deleteData();
    break;

  default:
    throw new Error('Please provide a valid command');
}
