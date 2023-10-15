const { query } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { parse } = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")

});
app.post("/", function (req, res) {
    const query=req.body.cityName;
    const apiKey="ca63537676d588a61db8645d13cbf3f7"
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){

        response.on("data", function(data){
           const Weatherdata=JSON.parse(data)
           const temp=Weatherdata.main.temp
           const Weatherdesc=Weatherdata.weather[0].description
           const icon=Weatherdata.weather[0].icon
           const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
           res.write("<p>Weather conditon is "+Weatherdesc+"</p>") 
           res.write("<h1>The temperature in "+query+" is "+temp+" celsius<h1>")
           res.write("<img src="+imageURL+">")
           res.send()
        })
    });
})




app.listen(3000, function () {
    console.log("Server is running on port 3000");
})