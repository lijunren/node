const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    console.log("proxy中间件");
    next();
});

router.get("/api", (req, res) => {
    console.log(req.body);
    res.json({
        code: 0
    });
});
router.post("/api", (req, res) => {
    console.log(req.body);
    // throw new Error();
    res.json({
        code: 0,
        method: "post"
    });
});

module.exports = router;