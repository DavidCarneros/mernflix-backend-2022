var express = require("express")
var mongoose = require("mongoose")

var router = express.Router()

// Models 
var Bookmark = require("../models/Bookmark.js")

var db = mongoose.connection;

/* GET bookmarks listing from an user by user email.*/
router.get("/:email", function(req, res, next) {
    Bookmark.find({ "email": req.params.email }).sort('-addeddate')
        .populate('movie').exec(function (err, bookmarks){
            if (err) return res.status(500).send(err);
            else res.status(200).json(bookmarks);
        });
});

/* POST a new bookmark */
router.post("/", function(req, res, next) {
    Bookmark.create(req.body, function(err, bookmark) {
        if (err) return res.status(500).send(err);
        else res.sendStatus(200);
    });
});

/* PUT an existing bookmark */
router.put("/:id", function(req, res, next) {
    Bookmark.findByIdAndUpdate(req.params.id, req.body, function(err, bookmark) {
        if (err) return res.status(500).send(err);
        else res.sendStatus(200);
    });
});

/* DELETE an existing bookmark */
router.delete("/:id", function(req, res, next) {
    Bookmark.findByIdAndDelete(req.params.id, function(err, bookmark) {
        if (err) return res.status(500).send(err);
        else res.sendStatus(200);
    });
});

module.exports = router;