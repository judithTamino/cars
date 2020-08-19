import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Cars.css";

const Cars = () => {
  const [carModel, setCarModel] = useState([]);
  const [carsArr, setCarsArray] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/cars/").then((res) => {
      let cars = [];
      res.data.manufacturer.map((model) => {
        cars.push(model.name);
        return cars;
      });
      setCarModel(cars);
    });
  }, []);

  const getCarsByModel = (event) => {
    axios
      .get(`http://localhost:5000/cars/by_model/${event}`)
      .then((res) => {
        setCarsArray(res.data);
      })
      .catch((err) => setCarsArray([]));
  };

  const getCarsByYear = (event) => {
    axios
      .get(`http://localhost:5000/cars/by_year/${event}`)
      .then((res) => {
        setCarsArray(res.data);
      })
      .catch((err) => setCarsArray([]));
  };

  let content = (
    <div className="Cars">
      <section className="cars_title container-fluid">
        <h3>Cars Catalogue</h3>
      </section>

      <section className="cars_searchSection container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <select
              onChange={(e) => {
                getCarsByModel(e.target.value);
              }}
            >
              <option disabled>select car model</option>
              {carModel.map((car, index) => {
                return (
                  <option key={index} value={car}>
                    {" "}
                    {car}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-lg-6">
            <select
              onChange={(e) => {
                getCarsByYear(e.target.value);
              }}
            >
              <option disabled>select year</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
      </section>

      <section className="cars_resultSection container-fluid">
              <div className="row">
                {
                  carsArr.map((car, index) => {
                    return (
                      <div className="col-lg-4 col-md-6" key={index}>
                        <div className="card">
                          <img className="card-img-top" src={car.img_url} alt="" width="100%" height="200" />
                          <div className="card-body cars_details">
                            <h5 className="card-title car_model"> {car.model} </h5>
                            <h6 className="result-title"> {car.make} </h6>
                            <p className="cars_horsepower"> {car.horsepower} PS </p>
                            <p className="cars_yearManufacture"> {car.year} </p>
                          </div>
                          <ul className="list-group cars_cost">
                            <li className="list-group-item"> ${car.price} </li>
                          </ul>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
      </section>
    </div>
  );

  return content;
};

export default Cars;
