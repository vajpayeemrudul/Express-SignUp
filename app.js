const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.get("/develop",function(req,res){
    res.sendFile(__dirname+"/develop.html");
})

app.post("/",function(req,res){

    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;
     //console.log(firstname,lastname,email);

    const data= {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                   FNAME: firstname,
                   LNAME: lastname 
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url= "https://us6.api.mailchimp.com/3.0/lists/d7653a092d";
    const options={
        method: "POST",
        auth: "mrudul:572382577766fb906b9dc6fb134ba96b-us6"
    }

    const request = https.request(url,options, function(response){
        
        if(response.statusCode===200)
          res.sendFile(__dirname+"/success.html");
        else
        res.sendFile(__dirname+"/failure.html");

         response.on("data",function(data){
             console.log(JSON.parse(data));
         })
    })

    request.write(jsonData);
    request.end();

})


app.post("/failure",function(req,res){
    res.redirect("/");
})

app.post("/success",function(req,res){
    res.redirect("/develop");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("visit port 3001");
})
//API KEY
//572382577766fb906b9dc6fb134ba96b-us6

//List ID
//d7653a092d