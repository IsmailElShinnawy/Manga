const config = require('../../config/auth.config');
const Account = require('../account/account.model');
const Role = require('../role/role.model');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  try {
    const userRoleId = (await Role.findOne({ name: 'user' }))._id;
    const {
      username,
      email,
      password,
      firstname,
      lastname,
      homeAddress,
      countryCode,
      telephoneNumber,
      passportNumber,
    } = req.body;

    const accountWithSameEmailOrUsername = await Account.findOne({
      $or: [{ email }, { username }],
    });
    if (Boolean(accountWithSameEmailOrUsername)) {
      return res.status(400).json({
        status: 'fail',
        message: 'An account with the same email or username already exists',
      });
    }

    const account = new Account({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
      firstname,
      lastname,
      countryCode,
      telephoneNumber,
      homeAddress,
      passportNumber,
      roles: [userRoleId],
    });
    await account.save();
    const token = jwt.sign({ id: account._id }, config.secret, { expiresIn: '365d' });
    res.json({ status: 'success', data: { account, token } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
    console.log(err);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const account = await Account.findOne({ email }).populate('roles').exec();
    if (!account) {
      return res.status(404).json({ status: 'fail', message: 'wrong email or password' });
    }

    const isPasswordValid = bcrypt.compareSync(password, account.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: 'fail', message: 'wrong email or password' });
    }
    const token = jwt.sign({ id: account._id }, config.secret, { expiresIn: '365d' });
    res.status(200).json({
      status: 'success',
      data: { account, token },
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
    console.log(err);
  }
};

module.exports = {
  signup,
  signin,
};
