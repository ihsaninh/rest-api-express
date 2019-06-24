const express = require("express");
const router = express.Router();
const model = require("../models/index");

router.get("/", async function(req, res, next) {
    try {
        const feeds = await model.feeds.findAll({ include: ["user"] });
        if (feeds.length !== 0) {
            res.json({
                status: "200 OK",
                messages: "Success",
                data: feeds
            });
        } else {
            res.json({
                status: "404 Not Found",
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
        const feedsId = req.params.id;
        const feeds = await model.feeds.findByPk(feedsId, {
            include: ["user"]
        });
        if (feeds.length !== 0) {
            res.json({
                status: "200 OK",
                messages: "Success",
                data: feeds
            });
        } else {
            res.json({
                status: "404 Not Found",
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
        const { status, feedsId } = req.body;
        const feeds = await model.feeds.create({
            status,
            feedsId
        });
        if (feeds) {
            res.status(201).json({
                status: "OK",
                messages: "Status berhasil ditambahkan",
                data: feeds
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
        const id = req.params.id;
        const { status } = req.body;
        const feeds = await model.feeds.update(
            { status },
            { where: { id: id } }
        );
        if (feeds) {
            res.json({
                status: "OK",
                messages: "Status berhasil diupdate",
                data: feeds
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
        const feedsId = req.params.id;
        const feeds = await model.feeds.destroy({
            where: {
                id: feedsId
            }
        });
        if (feeds) {
            res.json({
                status: "OK",
                messages: "Status berhasil dihapus",
                data: feeds
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
