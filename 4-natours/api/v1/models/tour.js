const { model, Schema } = require('mongoose');

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    trim: true,
    unique: true,
    minlength: [10, 'A tour name must be atleast 10 characters long'],
    maxlength: [40, 'A tour name may not be longer than 40 characters'],
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
    min: [0, 'A tour price must be greater than 0'],
  },
  rating: {
    type: Number,
    // default: 2.5,
    min: [0, 'A tour rating must be greater than 0'],
    max: [5, 'A tour rating may not be greater than 5'],
  },
});

const Tour = model('Tour', tourSchema);

module.exports = Tour;
