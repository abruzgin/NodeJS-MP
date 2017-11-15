import db from './../config/db';

export const getUsers = (req, res) => {
  // return res.send("get all users");
  return db.users.findAll()
    .then(users => {
      return res.send(`Get all users ${users}`);
    })
    .catch(err => res.send(err));
}