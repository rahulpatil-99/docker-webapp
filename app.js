const express = require("express");

const app = express();
const form = `<form action="/add" method="POST"><input name="number" placeholder="give number"><button type="submit">submit</button></form>`;
const GETNUMBERS = "select number from numbers";

const executeQuery = (client1,query,resolver,rejected) => {
    client1.query(query)
        .then((resp)=>{ resolver(resp); })
        .catch((err)=>{ rejected(err); });
};

const getNumbers = (req,res) =>{
    let resolver = (resp) => res.send(form + resp.rows.reduce((init, item)=> init.concat(item.number),[]));
    let rejected = (err) => res.send(form + "we are facing some problem!");
    executeQuery(app.getClient(), GETNUMBERS, resolver, rejected);
};

const insertNumber = (req, res) => {
    let insertQuery = `insert into numbers values(${req.body.number})`;
    let resolver = (resp) => res.redirect("/");
    let rejected = (err) => res.redirect("/");
    executeQuery(app.getClient(), insertQuery, resolver, rejected);
};

app.use(express.urlencoded({ extended: false}));

app.get("/", getNumbers)

app.post("/add", insertNumber);

app.listen(9000);

module.exports = app;