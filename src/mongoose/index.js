// 首先需要连接数据库
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/myDataBase";

function startMongo() {
    mongoose.connect(url, { useNewUrlParser: true });

    const con = mongoose.connection;

    con.on("error", function() {
        console.log("连接数据库失败");
    });
    con.once("connected", function() {
        console.log("connect successful");
    });
}

module.exports = startMongo;
