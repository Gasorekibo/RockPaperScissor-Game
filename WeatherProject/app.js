const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html")
})

// the code below will use body-parser module to retrieve data from user form input and use it in them to retrieve the related weather data.
app.post("/", function(req,res) {
    const cityName = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=4173844c6955c35ac8300bd9ce0131b3";
    
    // this code use https node module to fetch api data and parse them into json format to get actual data and return them to the user's browser.
    https.get(url, function(response){
        console.log(response.statusCode);

        // bellow code is used to take the response we get from an api and parse it into a json format for easy retrieving data.
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const windSpeed = weatherData.wind.speed;
            const cityName = weatherData.name;
            const temperature = weatherData.main.temp;
            const Description = weatherData.weather[0].description;

            // Retrieving weather icon and use it in icon api to get the png image related to the current weather condition
            
            const icon = weatherData.weather[0].icon;
            const iconurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            

            res.write("<h1>The temperature of "+cityName+" is :"+ +temperature+" Degree Celicius</h1>");
            res.write("the wind speed of "+cityName + " is "+windSpeed);
            res.write("<h2>  We can describe the weather of "+cityName+" as :" +Description+"</h2>");
            // adding weather image icon to our site.

            res.write("<img src= "+iconurl+">")
            res.send()
        })
    })
})

// Defining the port that our server will listen on
app.listen(3000, function(){
    console.log("my server is running on port 3000");
})