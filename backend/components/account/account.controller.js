const account = require('./account.model');

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
