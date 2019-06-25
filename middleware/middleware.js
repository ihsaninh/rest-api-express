const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

express().use(bodyParser.json());

const auth = (req, res, next) => {
    const token =
        req.headers.authorization != undefined
            ? req.headers.authorization.split(" ")[1]
            : false;
    if (token) {
        jwt.verify(token, `iWantTellYouAGreatStory`, (err, decoded) => {
            if (err) {
                res.status(403).send({
                    status: "ERROR",
                    message: err,
                    data: {}
                });
            } else {
                req.userData = decoded;
                next();
            }
        });
    } else {
        res.status(403).send({
            status: "ERROR",
            message: "Token is undefined",
            data: {}
        });
    }
};

module.exports = { auth };
