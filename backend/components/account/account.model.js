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
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
  ],
});

module.exports = model('Account', accountSchema);
