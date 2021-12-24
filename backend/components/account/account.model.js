const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  passportNumber: {
    type: String,
    required: true,
  },
  telephoneNumber: {
    type: String,
    required: true,
  },
  homeAddress: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
  ],
});

module.exports = model('Account', accountSchema);
