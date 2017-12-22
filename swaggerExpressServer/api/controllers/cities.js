'use strict';

const City = require("../../../expressServer/models/cities_mongo");

function getAllCities(req, res) {
  City.find({}, (err, cities) => {
    if (err) return res.json({Error: err});
    return res.json(cities);
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
    if (err) return res.json({Error: err});
    return res.json(city);
  });
}

function getRandomCity(req, res) {
  City.find({}, (err, cities) => {
    if (err) return res.json({Error: err});
    const cityIndex = Math.round(Math.random() * (cities.length - 1));
    return res.json(cities[cityIndex]);
  });
}

function updateCity(req, res) {
  const _id = req.swagger.params.id.value;
  const body = req.swagger.params.body.value;
  const options = {
    new: true
  }
  City.findOneAndUpdate({ _id }, body, options, (err, city) => {
    if (err) return res.json({Error: err});
    return res.json(city);
  })
}

function deleteCity(req, res) {
  const _id = req.swagger.params.id.value;
  City.remove({ _id }, (err, city) => {
    if (err) return res.json({Error: err});
    return res.json({message: "City successfully removed"});
  });
}

module.exports = {
  getAllCities: getAllCities,
  createCity: createCity,
  getRandomCity: getRandomCity,
  updateCity: updateCity,
  deleteCity: deleteCity
};