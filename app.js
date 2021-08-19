const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const { url } = require("inspector");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/sign-up.html");
});

app.post("/", function (req, res) {

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,

                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);// to convert javascript data to Json and stringify is used to turn data into a string.

    const url = "https://us5.api.mailchimp.com/3.0/lists/f748547f3c";

    const options = {
        method: "POST",
        auth: "Aditya10:b7260c2257d1ae14bd863b4482c1914a-us5"
    }

    const request = https.request(url, options, function (response) {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

});

app.post("/failure" ,function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
})
// API KEY
// b7260c2257d1ae14bd863b4482c1914a-us5

// list id
// f748547f3c