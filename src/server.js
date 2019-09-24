const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressHttpProxy = require("express-http-proxy");
// const user = require("./router/user/user");
// const infoApi  = require("./router/infoApi/index");
// const infoApi1 = require("./router/infoApi/index1");
const proxys = require("./router/proxy/index");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
// app.use("/user", user);
// app.use("/info", infoApi);
// app.use("/info", infoApi1);
app.use("/proxy", proxys);
app.use("/proxys", expressHttpProxy("http://localhost:3366", {
    proxyReqPathResolver: function (req) {
        console.log(req.url);
        const parts = req.url.split('?');
        const queryString = parts[1];
        const updatedPath = parts[0];
        return "/proxy" + updatedPath + (queryString ? ("?" + queryString) : "");
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        // console.log("Decorator>>>>>>>>>>>>>",userReq.headers);
        data = JSON.parse(proxyResData.toString('utf8'));
        data.newProperty = 'exciting data';
        return JSON.stringify(data);
    },
    userResHeaderDecorator: (headers, userReq, userRes, proxyReq, proxyRes) => {
        headers._mi_ = "11111111111111111";
        // console.log("header>>>>>>>>>>>>>", headers,userReq.headers);
        return headers;
    },
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
        console.log("BodyDecorator>>>>>>>>>>>>>", bodyContent);
        bodyContent.age = 19;
        return (bodyContent);
    },
    proxyErrorHandler: (err, res, next) => {
        console.log("err>>>>>>>", err);
        next(err);
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        // you can update headers
        // you can change the method
        // proxyReqOpts.method = 'GET';
        return proxyReqOpts;
    },
    // parseReqBody: false,
}));

app.listen(3366);
