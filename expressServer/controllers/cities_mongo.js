import City from './../models/cities_mongo';

export function getRandomCity(req, res) {
  City.find({}, (err, cities) => {
    if (err) return res.send(err);
    const cityIndex = Math.round(Math.random() * (cities.length - 1));
    return res.send(cities[cityIndex]);
  })
}

export function createCity(req, res) {
  const { name, country, capital, location} = req.body;
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
  })
}