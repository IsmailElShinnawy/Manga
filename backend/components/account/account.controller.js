const account = require('./account.model');
exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};
exports.updateUserProfile = async (req, res) => {
  const {
    firstname,
    lastname,
    passportNumber,
    email,
  } = req.body;
  try {
    const oldProfileData = await account.findById(req.params.id);
    const updatedProfileData = {
      firstname: firstname || oldProfileData.firstname,
      lastname: lastname || oldProfileData.lastname,
      passportNumber: passportNumber || oldProfileData.passportNumber,
      email: email || oldProfileData.email,
   
    };
    const result = await account.findByIdAndUpdate(
      { _id: req.params.id },
      updatedProfileData,
      {
        returnDocument: 'after',
      }
    );
    res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
  exports.createUser = async (req, res) => {
    const {
      email,
      password,
      username,
      firstname,
      lastname,
      passportNumber,
      roles,
    } = req.body;
    try {
      const u = new User({
        email: email,
        password: password,
        username: username,
        firstname: firstname,
        lastname: lastname,
        passportNumber: passportNumber,
        roles: roles,
    
      });
      const result = await u.save();
      res.status(200).json({ status: 'success', data: result });
    } catch (err) {
      res.status(500).json({ status: 'fail', message: err });
    }
  };
};