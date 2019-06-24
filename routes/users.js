const express = require("express");
const router = express.Router();
const model = require("../models/index");

router.get("/", async function(req, res, next) {
    try {
        const users = await model.users.findAll({});
        if (users.length !== 0) {
            res.json({
                status: "200 OK",
                messages: "data ditemukan",
                data: users
            });
        } else {
            res.json({
                status: "ERROR",
                messages: "EMPTY",
                data: {}
            });
        }
    } catch (err) {
        res.json({
            status: "ERROR",
            messages: err.messages,
            data: {}
        });
    }
});

router.get("/:id", async function(req, res, next) {
    try {
        const users = await model.users.findOne({
            where: { id: req.params.id }
        });
        if (users.length !== 0) {
            res.json({
                status: "200 OK",
                messages: "data ditemukan",
                data: users
            });
        } else {
            res.json({
                status: "ERROR",
                messages: "EMPTY",
                data: {}
            });
        }
    } catch (err) {
        res.json({
            status: "ERROR",
            messages: err.messages,
            data: {}
        });
    }
});

router.post("/", async function(req, res, next) {
    try {
        const {
            name,
            avatar,
            email,
            gender,
            phone_number: phoneNumber
        } = req.body;
        const users = await model.users.create({
            name,
            avatar,
            email,
            gender,
            phone_number: phoneNumber
        });
        if (users) {
            res.status(201).json({
                status: "OK",
                messages: "User berhasil ditambahkan",
                data: users
            });
        }
    } catch (err) {
        res.status(400).json({
            status: "ERROR",
            messages: err.message,
            data: {}
        });
    }
});

router.put("/:id", async function(req, res, next) {
    try {
        const usersId = req.params.id;
        const {
            name,
            avatar,
            email,
            gender,
            phone_number: phoneNumber
        } = req.body;
        const users = await model.users.update(
            {
                name,
                avatar,
                email,
                gender,
                phone_number: phoneNumber
            },
            {
                where: {
                    id: usersId
                }
            }
        );
        if (users) {
            res.json({
                status: "OK",
                messages: "User berhasil diupdate",
                data: users
            });
        }
    } catch (err) {
        res.status(400).json({
            status: "ERROR",
            messages: err.message,
            data: {}
        });
    }
});
router.delete("/:id", async function(req, res, next) {
    try {
        const usersId = req.params.id;
        const users = await model.users.destroy({
            where: {
                id: usersId
            }
        });
        if (users) {
            res.json({
                status: "OK",
                messages: "User berhasil dihapus",
                data: users
            });
        }
    } catch (err) {
        res.status(400).json({
            status: "ERROR",
            messages: err.message,
            data: {}
        });
    }
});
module.exports = router;
