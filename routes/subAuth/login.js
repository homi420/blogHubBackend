const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const login = async (req, res, Users, JWT_SECRET) => {
    const { password, email } = req.body
    let user = await Users.findOne({ email });
    if (!user) {
        res.status(400).json({ success: false, error: "Please Write Correct Credentials To Login..." });
    }
    else {
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            res.status(400).json({ success: false, error: "Please Write Correct Credentials To Login" });
        }
        else {
            let data = {
                user:
                {
                    id: user.id,
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ success: true, authToken, msg: "Login Succesfull" })
        }

    }

}
module.exports = login