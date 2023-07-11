const User = require("../models/user.model");

const onGetAllUsersExceptCurrentUser = async (req, res, next) => {
  if (req.user.user_id) {
    User.find({ _id: { $nin: [req.user.user_id] } }, (err, doc) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(doc);
      }
    });
  } else {
    res.status(401).send("Invalid User");
  }
};

module.exports = { onGetAllUsersExceptCurrentUser };
