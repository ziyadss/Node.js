import { model, Model, Schema } from 'mongoose';
//  TODO: linup interface with MongoDB Schema
interface Tour {
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage?: number;
  ratingsQuantity: number;
  price: number;
  priceDiscount?: number;
  summary: string;
  description?: string;
  imageCover: string;
  images?: [string];
  createdAt: Date;
  startDates?: [Date];
}

const tourSchema = new Schema<Tour, Model<Schema>, Tour>({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    trim: true,
    unique: true,
    minlength: [10, 'A tour name must be atleast 10 characters long'],
    maxlength: [40, 'A tour name may not be longer than 40 characters'],
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
    min: [1, 'A tour duration must be atleast 1 day'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a maximum group size'],
    min: [1, 'A tour maximum group size must be atleast 1 person'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty must be easy, medium or difficult',
    },
  },
  ratingsAverage: {
    type: Number,
    min: [1, 'A tour rating must be atleast than 1'],
    max: [5, 'A tour rating may not be greater than 5'],
  },
  ratingsQuantity: { type: Number, default: 0 },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
    min: [0, 'A tour price must be greater than 0'],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator(this: Tour, val: number) {
        return val < this.price;
      },
    },
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary'],
  },
  description: { type: String, trim: true },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: { type: Date, default: new Date(), select: false },
  startDates: [Date],
});

const TourModel = model<Tour>('Tour', tourSchema);

export { Tour };
export default TourModel;
