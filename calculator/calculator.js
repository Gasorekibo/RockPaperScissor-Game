const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

// Requesting for home and return our calculator app
app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res) {
    var num1 = Number(req.body.num1);
    var num2 =Number(req.body.num2);
    var result = num1 + num2; 
    res.send("the result is "+ result);            
})

// Requesting /bmicalculator and return a created bmi calculator
app.get("/bmicalculator", function(req,res){
    res.sendFile(__dirname+"/bmicalculator.html");
})
app.post("/bmicalculator", function (req,res){
    var heigth = parseFloat(req.body.heigth);
    var weight = parseFloat(req.body.weigth);
    var bmi = weight / (heigth * heigth);
    res.send('Your BMI Result is '+ bmi);
})

// specifying the port number that our server is listening to.
app.listen(3000, function(){
    console.log("my server is running on port 3000");
})