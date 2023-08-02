const getUser = async (req, res, Users) => {
    let id = req.user.id
    let user = await Users.findById(id).select("-password")
    res.json({ success: true, user })
}
module.exports = getUser