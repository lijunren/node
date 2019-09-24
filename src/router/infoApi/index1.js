const express = require("express");
const router = express.Router();
const mongo = require("../../mongoose/index");
const schema = require("../../mongoose/schema/infoList");
const {add, find, deletes, modify} = require("../../mongoose/model/model");

mongo();
router.use((req, res, next) => {
    console.log("mongoose中间件");
    next();
});
router.post("/add.api", (req, res) => {
    if (req.body.name === "") {
        res.json({
            code: 1,
            msg: "name字段require",
            result: {},
        });
        return;
    }
    if (req.body.age === "") {
        res.json({
            code: 1,
            msg: "age字段require",
            result: {},
        });
        return;
    }
    add(req.body, schema, "infoBase").then((result) => {
        res.json({
            code: 0,
            msg: "success",
            result: "success",
        });
    });
});

router.post("/mongoosequery.api", (req, res) => {
    find(req.body, schema, "infoBase").then((result) => {
        if (result.length === 1) {
            result = result[0];
        }
        res.json({
            code: 0,
            data: result,
        });
    });
});
 
router.post("/mongooseDelete.api", (req, res) => {
    deletes(req.body, schema, "infoBase").then((result) => {
        res.json({
            code: 0,
            data: result,
        });
    });
});

router.post("/mongooseModify.api", (req, res) => {
    modify(req.body, schema, "infoBase").then((result) => {
        res.json({
            code: 0,
            data: result,
        });
    });
});
module.exports = router;
