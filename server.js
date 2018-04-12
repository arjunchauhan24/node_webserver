const express = require('express');
const fs=require('fs');
const hbs = require('hbs');

var app=express();  //Declaring view engine
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); //middleware

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log= `${now}: ${req.method} ${req.url}` ;
  console.log(log);
  fs.appendFile('server.log',log+'\n', (err)=>{
    if (err){
      console.log("Error in appending the file");
    }
  });
  next();
});


app.use((req,res,next)=>{
  res.render('underconstruction.hbs');
});

hbs.registerHelper("getyear",()=>{
  return new Date().getFullYear();
});


hbs.registerHelper("screamIt",(text)=> {
  return text.toUpperCase();
});

app.get('/',(req,res)=> {
  res.render('home.hbs',{
    pagetitle:"Home Page",
    welcomemessage:"Welcome to our home page!",
    year : new Date().getFullYear()
  });
});

app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    pagetitle:"About Page",
    year: new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    name : "Arjun",
    last : "Singh",
    year : 3,
    home : "Jammu"
  });
});

app.get('/HTML', (req,res) =>{
  res.send("<h1>Arjun<h1>");
});

app.listen(3000);
