const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();
const app = express();

const model = require("../models/index");

app.use(bodyParser.json());

router.post("/signin", async (req, res) => {
    let { email, password } = req.body;

    try {
        const findUser = await model.users.findOne({
            where: {
                email: email
            }
        });
        if (findUser) {
            const validPassword = bcrypt.compare(
                password,
                findUser.password,
                function(err, res) {
                    return res;
                }
            );

            if (validPassword) {
                res.status(200).send({
                    status: "OK",
                    messages: "all done",
                    data: findUser
                });
            } else {
                res.status(400).send({
                    status: "ERROR",
                    messages: "password is incorrect",
                    data: {}
                });
            }
        } else {
            res.status(400).send({
                status: "ERROR",
                messages: "account not found",
                data: {}
            });
        }
    } catch (err) {
        res.status(400).send({
            status: "ERROR",
            messages: err.messages,
            data: {}
        });
    }
});

router.post("/create/authorization", (req, res) => {
    let { email, name } = req.body;

    jwt.sign(
        { email: email, name: name },
        "iWantTellYouAGreatStory",
        (err, token) => {
            if (err) {
                res.status(400).send({
                    status: "ERROR",
                    message: err,
                    data: { token: null }
                });
                console.log(err);
            } else {
                res.status(200).send({
                    status: "OK",
                    message: "token successfully created",
                    data: { token: token }
                });
            }
        }
    );
});

module.exports = router;
