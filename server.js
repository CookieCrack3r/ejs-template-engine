"use strict";

const fs = require("fs");
const express = require("express");
const app = express();
const IP = "127.0.0.1";
const PORT = 8081;

app.set("view engine","ejs");
app.set("views", __dirname + "/public");

app.use(express.static("public"));

fs.readFile("products.csv","UTF8", (error,data) => {
    let products = data.split("\n");
    products.shift();

    let pages = products
    .filter( row => row !== "" )
    .map( recordToObject );

    app.get("/", (req,res) => {
        res.render("index", {items: pages});
    });

    app.get("/product/:ix", (req,res) => {
        res.render("product", {product: pages[req.params.ix]});
    });




    app.listen(PORT,IP, () => {
        console.log(`Server is rumming at http://${IP}:${PORT}`);
    });
});

let recordToObject = record => {
    const fields = record.split(",");
    return {
        name:           fields[0],
        description:    fields[1],
        quantity:       fields[2],
        price:          fields[3],
        stockWarn:      (fields[2] < 6) ? true : false
    };
};

