const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name: String,
    age: Number,
});

schema.methods.allInfo = function() {
    console.log(`${this.name}的年龄：${this.age}`);
}

module.exports = schema;
