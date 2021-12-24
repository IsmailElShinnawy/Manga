const account = require('./account.model');
const bcrypt = require('bcryptjs');

exports.updateUserProfile = async (req, res) => {
  const { firstname, lastname, passportNumber, email } = req.body;
  try {
    const oldProfileData = await account.findById(req.accountId);
    const updatedProfileData = {
      firstname: firstname || oldProfileData.firstname,
      lastname: lastname || oldProfileData.lastname,
      passportNumber: passportNumber || oldProfileData.passportNumber,
      email: email || oldProfileData.email,
    };
    const result = await account
      .findByIdAndUpdate({ _id: req.accountId }, updatedProfileData, {
        returnDocument: 'after',
      })
      .populate('roles')
      .exec();
    res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
};

exports.changePassword = async (req, res) => {
  const { password, newPassword } = req.body;

  try {
    const userAccount = await account.findById(req.accountId);
    const isPasswordValid = bcrypt.compareSync(password, userAccount.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: 'fail', message: 'Wrong password' });
    }
    await account.findByIdAndUpdate(userAccount._id, {
      password: bcrypt.hashSync(newPassword, 8),
    });
    return res.status(200).json({ status: 'success', data: 'password changed' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'fail', message: err });
  }
};
