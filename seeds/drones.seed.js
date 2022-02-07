const mongoose = require("mongoose");
const Drone = require('../models/Drone.model')
const express = require('express');
const router = express.Router();


const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const drones = [
  {
    name: 'drone1',
    propellers: 4,
    maxSpeed: 16
  },
  {
    name: 'drone2',
    propellers: 7,
    maxSpeed: 22
  },
  {
    name: 'drone3',
    propellers: 5,
    maxSpeed: 18
  }
]


Drone.create(drones)
.then(results => {
  console.log("drones created!", results)
  res.render('index', {title: `3 drones have been created!`})
})
.catch(err => {
  console.log("something went wrong creating drones", err)
}).finally(() => {
  mongoose.connection.close();
})
