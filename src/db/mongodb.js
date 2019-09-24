const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017";

function startMongoDb(cb, data = {}, dbName, tableName) {
    if (dbName === "") {
        assert.equal(null, dbName, "请传入数据库名！！！!");
        return;
    }
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            assert.equal(null, err, "连接出错啦！！！!");
            console.log("Connection successfully to server");
            const db = client.db(dbName);
            cb(db, (result) => {
                client.close();
                resolve(result);
            }, data, tableName);
        });
    });
    
}
module.exports = startMongoDb;