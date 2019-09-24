const express = require("express");
const ObjectId = require("mongodb").ObjectID;
const router = express.Router();
const mongoDb = require("../../db/mongodb");
const {insertDocument, findDocment, removeDocument} = require("../../db/dataHandle");


// mongoDb(insertDocument, data = [{a: "jsj"}, {b: "kie"}], "myDataBase", "baseInfo");
// mongoDb(findDocment,data = {}, "myDataBase", "baseInfo");

router.use((req, res, next) => {
    console.log("列表中间件");
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

router.post("/addInfo.api", (req, res) => {
    console.dir(req.body);
    mongoDb(insertDocument, [req.body], "myDataBase", "infoBase").then((insert) => {
        res.json({
            code: 0,
            msg: "",
        });
    });
});

router.post("/query.api", (req, res) => {
    mongoDb(findDocment, req.body, "myDataBase", "infoBase").then((result) => {
        res.json({
            code: 0,
            data: result
        });
    });
});

router.post("/delete.api", (req, res) => {
    const id = req.body.id;
    mongoDb(removeDocument, {_id: new ObjectId(id)}, "myDataBase", "infoBase").then((result) => {
        res.json({
            code: 0,
            result,
        });
    });
});
module.exports = router;