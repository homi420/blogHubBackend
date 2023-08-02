const jwt = require("jsonwebtoken")
const JWT_SECRET = "1WDCFT6YHNMKO012345QWERASDFZXCV"
const fetch = async (req, res, next) => {
    let authToken = req.header("authToken");
    if (!authToken) {
        res.status(400).json({ success: false, error: "Please Authenticate using the valid token." });
    }
    else {
        let data = jwt.verify(authToken, JWT_SECRET);
        if (!data) {
            res.status(400).json({ success: false, error: "Please Authenticate using the valid token." });

        }
        else {
            req.user = data.user
        }

    }

    next();

}
module.exports = fetch