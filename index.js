const { Client } = require('pg');
const app = require('./app.js');

const DBCONNECTION = process.env.DBCONNECTION;
const client = new Client(DBCONNECTION);
const CREATENUMBERTABLE = "create table numbers(number varchar(10))";

app.getClient = () => client;

client.connect()
    .then(()=>{
        client.query(CREATENUMBERTABLE).then((resp)=>{
            console.log("table successfully created!");
          }).catch((err)=>{
            console.log("table already exist!");
          });
        console.log(`listening at ${9000}`);
    })
    .catch(err=>console.log(err));
