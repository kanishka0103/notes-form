// import express module
const express = require('express');
const app = express();
// import path 
const path = require('path');
// require the fs module
const fs = require('fs');



app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));;


// create route 
app.get('/', (req, res) => {
    fs.readdir(`./files`,function(err, files){
         res.render("index", { files: files });
    });
   
})


// create a route to render files when read more is clicked 
app.get(`/files/:filename`, (req, res) => {
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err, filedata){
         res.render("show", { filename:req.params.filename, filedata: filedata});
    });
   
})

app.get(`/edit/:filename`, (req, res) => {
    res.render("edit", { filename:req.params.filename});
});

app.post(`/edit`, (req, res) => {
   fs.rename(`./files/${req.body.Previous}`, `./files/${req.body.new}.txt`, function (err) {
    res.redirect('/');
   }    );
})

// create route /create
app.post('/create', (req, res) => {
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
    res.redirect('/');
   });
})

// set the app to listen on port 3000
app.listen(3000);