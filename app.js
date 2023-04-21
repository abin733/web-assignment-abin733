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
    const uniqueCountries = getUniqueCountries().sort();
    const uniqueIds = getUniqueIds();
    res.render("home", { cars: carData, countries: uniqueCountries , carId:uniqueIds});

});

// When a GET request is made to "/" (i.e. the root path), render the
// "/cars/years" view. This can be found in /views/carsbyyear.handlebars
app.get("/cars/years", function(req,res){
    console.log("Request received to 'cars/years' ");
    console.log(JSON.stringify(req.query));

    const lowerYear = req.query.lower;
    const upperYear = req.query.upper;

    console.log(`lower: ${lowerYear} upper: ${upperYear}`);
    //TODO: create function to get cars by range of years
    const carsArray = getCarsByYears(lowerYear,upperYear);
    res.locals.cars = carsArray;

    //TODO: res.render & create Handlebars file
    res.render("carsbyyear");
});

// An example route handler function that demonstrates how car data can be sent to the web browser
app.get("/cars/country", function (req, res) {
    const countryName = req.query.country;
    const cars = getCarsByCountry(countryName);
    res.json(cars);
});

app.get("/cars/id", function (req, res) {
    const carsId = req.query.carId;
    const selectedId = getCarsById(carsId);
    res.json(selectedId);
});

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

// An example function that gets all cars from a given country
function getCarsByCountry(countryName){
    if (!countryName) {
        return carData;
    }
    const carsFromCountry = carData.filter((car) => car.country === countryName);
    return carsFromCountry;
}

function getCarsById(carId){
    console.log("get cars by id:" + carId)
    let carsId = [];
    if (!carId) {
        return carData;
    }
    for (let i = 0; i < carData.length; i++) {
        if(carData[i].id == carId){
            console.log("Matched");
            carsId.push(carData[i]);
        }

    }
    console.log(JSON.stringify(carsId))
    return carsId;
}

function getCarsByYears(lower,upper){
    const filteredResults = carData.filter(function (car) {
        return car.carYear >= lower && car.carYear <= upper;       
    });
    return filteredResults;
}

function getUniqueCountries() {
    const countries = carData.map((car) => car.country);
    return [...new Set(countries)];
}

function getUniqueIds() {
    const carsId = carData.map((car) => car.id);
    return [...new Set(carsId)];
}

// Function to get cars by lower and upper years...
// function getCarsByYears(lower,upper){
//     let filteredResults = [];
//     for (let i = 0; i < carData.length; i++) {
//         if(carData[i].carYear >= lower && carData[i].carYear <= upper){
//             filteredResults.push(carData[i]);
//         }

//     }
//     // Test filtered results
//     //console.log(JSON.stringify(filteredResults));
//     return filteredResults;
// }



