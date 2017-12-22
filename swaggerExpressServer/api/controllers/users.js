'use strict';

const User = require("../../../expressServer/models/cities_mongo");

function getAllUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) return res.json({Error: err});
    return res.json(users);
  });
}
function createUser(req, res) {
  const { password, username, email } = req.swagger.params.body.value;
  User.create({
    password, username, email
  }, (err, user) => {
    if (err) return res.json({Error: err});
    return res.json(user);
  });
}
function deleteUser(req, res) {
  const _id = req.swagger.params.id.value;
  User.remove({ _id }, (err, succ) => {
    if(err) res.json({Error: err});
    return res.json({message: "User successfully removed"})
  });
}

module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser,
  deleteUser: deleteUser
};