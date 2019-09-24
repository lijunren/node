const mongoose = require("mongoose");
const assert = require("assert");

function add(data, schema, table) {
    const model = mongoose.model(table, schema, table);
    if (!data || data === {}) {
        assert.deepEqual(data, null, "传入的数据不能为null");
        assert.deepEqual(data, {}, "请传入数据");
        return "缺少必要的参数";
    }
    const item = new model(data);
    return new Promise((resolve, reject) => {
        item.save().then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
}

function find(data, schema, table) {
    const model = mongoose.model(table, schema, table);
    if (!data || data === {}) {
        assert.deepEqual(data, null, "传入的数据不能为null");
        return "缺少必要的参数";
    }
    return new Promise((resolve, reject) => {
        model.find(data, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    })
}
function deletes(data, schema, table) {
    const model = mongoose.model(table, schema, table);
    if (!data || data === {}) {
        assert.deepEqual(data, null, "传入的数据不能为null");
        return "缺少必要的参数";
    }
    return new Promise((resolve, reject) => {
        model.deleteOne(data, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    })
}

function modify(data, schema, table) {
    const model = mongoose.model(table, schema, table);
    console.log("modify>>>>>", data);
    return new Promise((resolve, reject) => {
        model.updateOne({_id: data._id}, {$set:{name: data.name, age: data.age}}, 
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
    })
    
}
module.exports = {add, find, deletes, modify};
