const router = require("express").Router();
const fetch = require("node-fetch");
const { response } = require("express");

router.route("/").get((req, res) => {
  let carsModelArray = [];
  fetch(
    "https://private-anon-e9dc8caca9-carsapi1.apiary-mock.com/manufacturers"
  )
    .then((response) =>
      response.json().then((cars) => {
        cars.map((model) => carsModelArray.push(model.name));
        res.json(carsModelArray);
      })
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/by_model/:model").get((req, res) => {
  const car_model = encodeURIComponent(JSON.stringify({ 
    Make: `${req.params.model}` 
  }));

  fetch(
    `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=20&order=Make&where=${car_model}`,
    {
      headers: {
        "X-Parse-Application-Id": "QjhHzAgNuubBUMlMyfE5jMtU3tNgnsCFHgVRSKpa", // app's application id
        "X-Parse-REST-API-Key": "FC91eeoEtf3DHCxjXmMLguIAwdagb4aWaMh5JgMD", // app's REST API key
      },
    }
  )
    .then((response) => response.json().then((cars) => res.json(cars)))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/by_year/:year').get((req, res) => {
    const car_year = encodeURIComponent(JSON.stringify({
        "Year": parseInt(req.params.year) 
    }));

    fetch(`https://parseapi.back4app.com/classes/Car_Model_List?limit=20&where=${car_year}`,
        {
            headers: {
                'X-Parse-Application-Id': 'hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z',
                'X-Parse-Master-Key': 'SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW', 
            }
        }
    )
        .then(response => response.json().then((cars => res.json(cars))))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/by_year/:year/:model').get((req, res) => {
    const car_year_model = encodeURIComponent(JSON.stringify({
        "Year": parseInt(req.params.year),
        "Make": `${req.params.model}` 
    }));

    fetch(`https://parseapi.back4app.com/classes/Car_Model_List?limit=20&where=${car_year_model}`,
        {
            headers: {
                'X-Parse-Application-Id': 'hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z',
                'X-Parse-Master-Key': 'SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW', 
            }
        }
    )
        .then(response => response.json().then((cars => res.json(cars))))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
