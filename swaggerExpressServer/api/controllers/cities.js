'use strict';

const City = require("../../../expressServer/models/cities_mongo");

function getAllCities(req, res) {
  City.find({}, (err, cities) => {
    if (err) return res.send(err);
    return res.send(cities);
  });
}

function createCity(req, res) {
  const { name, country, capital, location} = req.swagger.params.body.value;
  City.create({
    name,
    country,
    capital,
    location: {
      lat: location.lat,
      long: location.long
    }
  }, (err, city) => {
    if (err) return res.send(err);
    return res.send(city);
  });
}

function getRandomCity(req, res) {
  City.find({}, (err, cities) => {
    if (err) return res.send(err);
    const cityIndex = Math.round(Math.random() * (cities.length - 1));
    return res.send(cities[cityIndex]);
  });
}

function updateCity(req, res) {
  const _id = req.swagger.params.id.value;
  const body = req.swagger.params.body.value;
  const options = {
    new: true
  }
  City.findOneAndUpdate({ _id }, body, options, (err, city) => {
    if (err) return res.send(err);
    return res.send(city);
  })
}

function deleteCity(req, res) {
  const _id = req.swagger.params.id.value;
  City.remove({ _id }, (err, city) => {
    if (err) return res.send(err);
    return res.send("City successfully removed");
  });
}

module.exports = {
  getAllCities: getAllCities,
  createCity: createCity,
  getRandomCity: getRandomCity,
  updateCity: updateCity,
  deleteCity: deleteCity
};