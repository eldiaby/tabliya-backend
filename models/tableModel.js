const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: [true, 'Table number is required.'],
      unique: [true, 'Table number must be unique.'],
      index: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required.'],
      min: [1, 'Capacity must be at least 1.'],
      index: true,
    },
    location: {
      type: String,
      trim: true,
      enum: {
        values: ['indoor', 'outdoor', 'balcony', 'vip'],
        message:
          'Invalid location. Valid values are: indoor, outdoor, balcony, vip.',
      },
      default: 'indoor',
      index: true,
    },
    status: {
      type: String,
      trim: true,
      enum: {
        values: ['available', 'occupied', 'reserved', 'out_of_service'],
        message:
          'Invalid status. Valid values are: available, occupied, reserved, out_of_service.',
      },
      default: 'available',
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [200, 'Notes cannot be longer than 200 characters.'],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Table', tableSchema);
