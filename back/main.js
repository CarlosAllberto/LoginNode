const fs = require("fs");
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
require("dotenv").config({ path: ".env" });

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
    if(err) {
        console.log("connection error");
    }
})

app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    connection.query({
        sql: "SELECT * FROM login WHERE username = ? AND password = ?",
        timeout: 40000,
        values: [username, password]
    }, (error, results, fields) => {
        if(results.length > 0) {
            const token = jwt.sign({
                id_user: results[0].id,
                username: results[0].username,
                email: results[0].email
            }, 
            process.env.JWT_KEY,
            {
                expiresIn: "42h"
            });
            res.status(200).send({
                msg: "Autenticate",
                token: token
            });
        } else {
            res.send({msg: "username ou senha invalidos"});
        }
    });
});

app.post("/create", (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    connection.query({
        sql: "SELECT * FROM login WHERE username LIKE ?",
        timeout: 40000,
        values: [username]
    }, (error, results, fields) => {
        if(results.length > 0){
            res.send({ msg: "username ja existe" });
        } else {
            connection.query({
                sql: "SELECT * FROM login WHERE email LIKE ?",
                timeout: 40000,
                values: [email]
            }, (error, results, fields) => {
                if(results.length > 0){
                    res.send({ msg: "email ja existe" });
                } else {
                    connection.query({
                        sql: "INSERT INTO login(username, email, password) VALUES (?, ?, ?)",
                        timeout: 40000,
                        values: [username, email, password]
                    }, (error, results, fields) => {
                        if(!error){
                            res.send({ msg: "created" });
                        } else {
                            //pass
                        }
                    });
                }
            });
        }
    });
});

app.get("/alguma_coisa", (req, res) => {
    //pass
});

app.listen(3001, () => {
    console.log("\nESCUTANDO NA PORTA: 3001\n");
});
