import express from "express";
import * as cities from '../controllers/cities_mongo';

const router = express.Router();

router.get('/random', cities.getRandomCity);
router.route('/') 
  .get(cities.getAllCities)
  .post(cities.createCity);

router.route("/:id")
  .put(cities.updateCity)
  .delete(cities.deleteCity);

export default router;