
const assert = require("assert");
function insertDocument(db, cb, data, tableName) {
    if (tableName === "") {
        assert.equal(tableName, "", "请输入表名！");
        return;
    }
    const collection = db.collection(tableName);
    collection.insertMany(data, (err, res) => {
        assert.equal(err, null, "数据插入错误");
        console.log("Insert data successfully!!!");
        cb(res);
    });
}

function findDocment(db, cb, data, tableName) {
    if (tableName === "") {
        assert.equal(tableName, "", "请输入表名！");
        return;
    }
    const collection = db.collection(tableName);
    collection.find(data).toArray(function(err,res){
        assert.equal(err,null);
        console.log("Found the following records");
        cb(res);
    });
}

function removeDocument(db, cb, data, tableName){
    if (!data) {
        assert.deepStrictEqual(data, null, "请传入要删除的数据！！");
        return;
    }
    // get the documents collection
    var collection = db.collection(tableName);
    // remove some documents
    collection.deleteOne(data, (err,res) => {
        console.log(res.result);
        assert.equal(err,null, "删除错误！！");
        assert.equal(res.result.n, 1, "删除");
        console.log("removed the record successfully");
        cb(res.result);
    });
};
module.exports = {insertDocument, findDocment, removeDocument};