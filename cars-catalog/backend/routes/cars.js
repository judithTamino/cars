const router = require("express").Router();

const manufacturers = require("../manufacturer.json");
const vehicle = require("../vehicle.json");

router.route("/").get((req, res) => {
  res.status(200).json(manufacturers);
});

router.route("/by_model/:model").get((req, res) => {
  let car_model = req.params.model;
  const vehicleArry = vehicle.vehicle;
  
  const results = vehicleArry.filter(
    (vehicleModel) => vehicleModel.make == car_model
  );

  if(results.length !== 0) {
    res.status(200).json(results);
  } else {
    res.status(404).json(`Error: ${res}`)
  }
});

router.route("/by_year/:year").get((req, res) => {
  let car_year = parseInt(req.params.year);
  const vehicleArry = vehicle.vehicle;

  const results = vehicleArry.filter(
    (vehicleModel) => vehicleModel.year == car_year
  )

  if(results.length !== 0) {
    res.status(200).json(results);
  } else {
    res.status(404).json(`Error: ${res}`)
  }
});

module.exports = router;
