const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport=require("passport");
const users=require("./routes/api/users");
const routes =require("./routes/api/users")
const path = require("path")

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

//DB CONFIGURATIONS

const db = require("./config/keys.js").mongoURI;
//lets connect to mongo

mongoose.connect(db,{useNewUrlParser:true})
.then(_ =>console.log("Mongo db successfully connected"))
.catch(_=>console.log("Error"));

app.use(passport.initialize());
require("./config/passport")("pass")

//routes
app.use("/api/users",users)

if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}


const port = process.env.PORT || 5000;

app.listen(port, _ => console.log(`The server is up and  running on port ${port}`));
