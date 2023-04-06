// The express package contains Express, and its own required dependencies. It needs to be
// installed using npm.
const express = require("express");
const app = express();
const port = 3000;

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({
    defaultLayout: null
}));
app.set("view engine", "handlebars");

// Setup static routing. Any file located in the "public" folder
// will be able to be accessed by clients directly.
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Get the car data from car-data.js
// will import an array of 220 car objects
const carData = require("./car-data");

// When a GET request is made to "/" (i.e. the root path), render the
// "home" view. This can be found in /views/home.handlebars
app.get("/", function (req, res) {
    res.render("home");

});

// An example route handler function that demonstrates how car data can be sent to the web browser
app.get("/cars", function (req, res) {
    const countryName = req.query.country;
    const cars = getCarsByCountry(countryName);
    res.json(cars);
});

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

// An example function that gets all cars from a given country
function getCarsByCountry(countryName){
    const carsFromCountry = carData.filter((car) => car.country === countryName);
    return carsFromCountry;
}


