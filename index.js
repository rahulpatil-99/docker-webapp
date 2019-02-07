const express = require("express");
const http = require('http');
const app = express();

const DBCONNECTION = process.env.DBCONNECTION;

const form = `<form action="/add" method="POST"><input name="number" placeholder="give number"><button type="submit">submit</button></form>`;

const homePage =(req,res)=> {
    res.send(form);
};

app.use(express.urlencoded({ extended: false}));

app.get("/", homePage)

http.createServer(app).listen(9000);