"use strict";

const Token = require("../models/token.model");

module.exports = async (req, res, next) => {

    req.user = null;

    console.log('hits');
    // console.log("bunu ariyorum", req.headers?.authorization || null);
     const auth = req.headers?.authorization || null;
     //  console.log(typeof(auth), auth);
     const tokenKey = auth ? auth.split(' ') : null;
    //  console.log("tokenKey", tokenKey);
    // console.log("tokenKey", Array.isArray(tokenKey));

    if(tokenKey && tokenKey[0] === "Token") {
        // req.user = 'lee'
        // console.log(req.user);

        const tokenData = await Token.findOne({token: tokenKey[1]}).populate('userId').lean();
        // console.log("tokenData", tokenData);
        
        if(tokenData) req.user = tokenData.userId;

    }




    next();

}