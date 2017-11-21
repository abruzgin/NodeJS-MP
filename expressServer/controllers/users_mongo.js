import User from '../models/users_mongo';

export const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.send(err);
    return res.send(users);
  });
}

export const createUser = (req, res) => {
  const { password, username, email } = req.body;
  User.create({
    password, username, email
  }, (err, user) => {
    if (err) return res.send(err);
    return res.send(user);
  });
}

export const deleteUser = (req, res) => {
  const { id: _id } = req.params;
  User.remove({ _id }, (err, succ) => {
    if(err) res.send(err);
    return res.send("User successfully removed")
  });
}