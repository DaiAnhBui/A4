/*********************************************************************************
* WEB322 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
of this
* assignment has been copied manually or electronically from any other source (including web sites)
or
* distributed to other students.
*
* Name: __Dai Anh Bui__ Student ID: _102629219__ Date: __30 October, 2022_
*
* Online (Cyclic) Link: ________________________________________________________
*
********************************************************************************/
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var offData = require("./modules/officeData.js");
var app = express()
app.use(express.static(path.join(__dirname, 'public'))) // built in express "static" middleware
app.use(express.urlencoded({ extended: true }));
// setup a 'PartTimer' to listen on the default url path
app.get("/PartTimer", (req, res) => 
{
    offData.getPartTimers().then
    ((resolve) => 
    {
        res.send(JSON.stringify(resolve));
    },
    (reject) => 
    {
        res.send(JSON.parse
        (
            {
                message:"no results"
            }
        ))
    })

});
   

// setup a 'home.html' to listen on the default url path
app.get("/home.html", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/home.html"));
});


// setup a '/employee/num' to listen on the default url path
app.get("/employee/num", (req, res) => 
{
    offData.getEmployeeByNum(num).then
    ((resolve) => 
    {
        resolve = num;
        res.send(JSON.stringify(resolve));
    })
});

// setup a 'audio.html' to listen on the default url path
app.get("/audio.html", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/audio.html"));
});
// setup a 'video.html' to listen on the default url path
app.get("/video.html", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/video.html"));
});
// setup a 'table.html' to listen on the default url path
app.get("/table.html", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/table.html"));
});

// setup a 'list.html' to listen on the default url path
app.get("/list.html", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/list.html"));
});

app.get("/storefront.html", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/storefront.html"));
});

// setup a 'incorrect route' to listen on the default url path
app.get("*", (req, res) => {
    res.send("Page Not Found", 404);
});


// setup http server to listen on HTTP_PORT
offData.initialize().then(()=> {
    app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)})
})
.catch((err)=>{
    alert(err.message);
})

// app.get("./views/audio.mp3", (req, res) => {
//     res.sendFile(path.join(__dirname, "./views/audio.mp3"));
// })