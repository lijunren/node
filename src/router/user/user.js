const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
    console.log("路由中间件");
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

router.get("/", (req, res) => {
    res.send("userInfo");
});

router.post("/post", (req, res) => {
    console.log("参数>>>>>>>>>.", req.query);
    console.log("params>>>>>>>>>.", req.params);
    res.json({
        data: {
            name: "kdsfkap",
        }
    });
})
module.exports = router;