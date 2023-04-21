// The express package contains Express, and its own required dependencies. It needs to be
// installed using npm.
const express = require("express");
const app = express();
const port = 3000;

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({
    defaultLayout: "Main"
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
    const uniqueCarMakes = getUniqueCarMakes().sort();
    const uniqueCarModels = getUniqueCarModels().sort();
    res.render("home", { cars: carData, countries: uniqueCountries , carId:uniqueIds, carModel:uniqueCarModels, carMake:uniqueCarMakes,});

});

app.get("/about", function (req, res) {
    const uniqueCountries = getUniqueCountries().sort();
    const uniqueIds = getUniqueIds();
    const uniqueCarMakes = getUniqueCarMakes().sort();
    const uniqueCarModels = getUniqueCarModels().sort();
    res.render("carsfavourite", { cars: carData, countries: uniqueCountries , carId:uniqueIds, carModel:uniqueCarModels, carMake:uniqueCarMakes,});

});

app.get("/cars/id", function (req, res) {
    console.log("Request received to 'cars/id' ");
    console.log(JSON.stringify(req.query));

    const id = req.query.carId;

    //TODO: create function to get cars by range of years
    const carsArray = getCarsById(id);
    res.locals.cars = carsArray;

    //TODO: res.render & create Handlebars file
    res.render("carsbyid");

});

app.get("/cars/carMake", function (req, res) {
    console.log("Request received to 'cars/carMake' ");
    console.log(JSON.stringify(req.query));

    const carMake = req.query.carMake;

    //TODO: create function to get cars by range of years
    const carsArray = getCarsByCarMake(carMake);
    res.locals.cars = carsArray;

    //TODO: res.render & create Handlebars file
    res.render("carsbycarmake");

});

app.get("/cars/carModel", function (req, res) {
    console.log("Request received to 'cars/carModel' ");
    console.log(JSON.stringify(req.query));

    const carModel = req.query.carModel;

    //TODO: create function to get cars by range of years
    const carsArray = getCarsByCarModel(carModel);
    res.locals.cars = carsArray;

    //TODO: res.render & create Handlebars file
    res.render("carsbycarmodel");

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
    const carsArray = getCarsByCountry(countryName);
    res.locals.cars = carsArray;
    res.render("carsbycountry")
});

// When a GET request is made to "/" (i.e. the root path), render the
// "/cars/prices" view. This can be found in /views/carsbyprice.handlebars
app.get("/cars/prices", function(req,res){
    console.log("Request received to 'cars/prices' ");
    console.log(JSON.stringify(req.query));

    const lowerPrice = req.query.lower;
    const upperPrice = req.query.upper;

    console.log(`lower: ${lowerPrice} upper: ${upperPrice}`);
    //TODO: create function to get cars by range of prices
    const carsArray = getCarsByPrices(lowerPrice,upperPrice);
    res.locals.cars = carsArray;

    //TODO: res.render & create Handlebars file
    res.render("carsbyprice");
});

// When a GET request is made to "/" (i.e. the root path), render the
// "/cars/odometers" view. This can be found in /views/carsbyodometer.handlebars
app.get("/cars/odometers", function(req,res){
    console.log("Request received to 'cars/odometers' ");
    console.log(JSON.stringify(req.query));

    const lowerodometer = req.query.lower;
    const upperodometer = req.query.upper;

    console.log(`lower: ${lowerodometer} upper: ${upperodometer}`);
    //TODO: create function to get cars by range of odometers
    const carsArray = getCarsByodometers(lowerodometer,upperodometer);
    res.locals.cars = carsArray;

    //TODO: res.render & create Handlebars file
    res.render("carsbyodometer");
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

function getCarsByCarMake(carMake){
    console.log("get cars by carMake:" + carMake)
    let carMakes = [];
    if (!carMake) {
        return carData;
    }
    for (let i = 0; i < carData.length; i++) {
        if(carData[i].carMake == carMake){
            console.log("Matched");
            carMakes.push(carData[i]);
        }

    }
    console.log(JSON.stringify(carMake))
    return carMakes;
}

function getCarsByCarModel(carModel){
    console.log("get cars by carModel:" + carModel)
    let carModels = [];
    if (!carModel) {
        return carData;
    }
    for (let i = 0; i < carData.length; i++) {
        if(carData[i].carModel == carModel){
            console.log("Matched");
            carModels.push(carData[i]);
        }

    }
    console.log(JSON.stringify(carModel))
    return carModels;
}

function getCarsByYears(lower,upper){
    const filteredResults = carData.filter(function (car) {
        return car.carYear >= lower && car.carYear <= upper;       
    });
    return filteredResults;
}

function getCarsByPrices(lower,upper){
    const filteredResults = carData.filter(function (car) {
        return car.price >= lower && car.price <= upper;       
    });
    return filteredResults;
}

function getCarsByodometers(lower,upper){
    const filteredResults = carData.filter(function (car) {
        return car.odometer >= lower && car.odometer <= upper;       
    });
    return filteredResults;
}



function getUniqueIds() {
    const carsId = carData.map((car) => car.id);
    return [...new Set(carsId)];
}

function getUniqueCarMakes() {
    const carsMake = carData.map((car) => car.carMake);
    return [...new Set(carsMake)];
}

function getUniqueCarModels() {
    const carsModel = carData.map((car) => car.carModel);
    return [...new Set(carsModel)];
}

function getUniqueCountries() {
    const countries = carData.map((car) => car.country);
    return [...new Set(countries)];
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


app.get("/cars/:carId", function (req, res) {
    const carId = req.params.carId;
    const car = carData.find((car) => car.id === parseInt(carId));
    res.json(car);
});



