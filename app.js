


const express = require("express");
const bodyParser = require('body-parser');
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public")); //relative to public/
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function (req,res) {
    res.sendFile(__dirname + "/signup.html");    
})

app.post("/" , function(req,res){
    var firstName =  req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    var data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME:lastName
                }
            }

        ]
    }
    var jsonData = JSON.stringify(data);

    var url = "https://us21.api.mailchimp.com/3.0/lists/06403af994";

    const options = {
        method : "POST",
        auth : "ali:ef3b164274f8f8ff344f9a4f014807ce-us21"
    }
    var request = https.request(url , options , function (response) {
        if ( response.statusCode ===200) {
            res.sendFile(__dirname + "/succes.html")
        }
        else{
            res.sendFile( __dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
     
})


app.post("/failure" ,function (req,res) {
    res.redirect("/");
})









app.listen(process.env.PORT,function () {
    console.log("server-running in port 3000");
})


//apikey
//ef3b164274f8f8ff344f9a4f014807ce-us21

//listid
//06403af994


