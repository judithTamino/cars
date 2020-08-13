import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Cars.css";

const Cars = (props) => {
  const [carModel, setCarModel] = useState([]);
  const [carsArr, setCarsArray] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/cars/").then((res) => {
      let cars = [];
      res.data.manufacturer.map((model) => {
        cars.push(model.name);
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
      {/* Title */}
      <section className="title_section">
        <div className="container-fluid">
          <h1 className="big-heading">Cars Catalogue</h1>
        </div>
      </section>

      <section className="search_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <select
                onChange={(e) => {
                  getCarsByModel(e.target.value);
                }}
              >
                <option value="">Select Car Model</option>
                {carModel.map((car, index) => (
                  <option key={index} value={car}>
                    {car}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-4">
              <select
                onChange={(e) => {
                  getCarsByYear(e.target.value);
                }}
              >
                <option value=""> Select Year </option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2018">2019</option>
                <option value="2020">2020</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="result_section">
        <div className="container-fluid">
          <div className="row">
            {carsArr.map((car, index) => {
              return (
                <div className="result-colum col-lg-4 col-md-6" key={index}>
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title"> {car.model} </h4>
                    </div>
                    <img src={car.img_url} alt="" width="100%" height="100"/>
                    <div className="card-body">
                      <h5 className="result-title"> {car.make} </h5>
                      <p> {car.horsepower} horsepower </p>
                      <p> {car.year} </p>
                      <ul className="list-group list-group-flush cost">
                        <li className="list-group-item"> </li>
                        <li className="list-group-item"> $ {car.price} </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );

  return content;
};

export default Cars;
