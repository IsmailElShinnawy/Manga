const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const Account = require('../components/account/account.model');
const Role = require('../components/role/role.model');

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.accountId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    console.log(req.accountId);
    const account = await Account.findById(req.accountId);
    if (!account) {
      return res.status(500).json({ status: 'fail', message: "can't find account" });
    }
    const roles = await Role.find({ _id: { $in: account.roles } });
    for (let i = 0; i < roles.length; ++i) {
      if (roles[i].name === 'admin') {
        next();
        return;
      }
    }
    res.status(403).json({ status: 'fail', message: 'Unauthorized' });
  } catch (err) {
    return res.status(500).json({ status: 'fail', message: err });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
