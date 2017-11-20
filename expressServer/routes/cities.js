import express from "express";
import * as cities from '../controllers/cities';

const router = express.Router();

router.get('/random', cities.getRandomCity);
router.post('/', cities.createCity);

export default router;