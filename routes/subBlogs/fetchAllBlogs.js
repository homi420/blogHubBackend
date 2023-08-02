const fetchAllBlogs = async (req, res, Blogs) => {
    const fetchedBlogs = await Blogs.find()
    if (!fetchedBlogs) {
        res.json({ success: false, error: "Failed To Fetch Blogs..." })
        console.error("Failed To fetch")

    }
    res.json({ success: true, fetchedBlogs, msg: "Blogs Fetched Successfully..." })
}
module.exports = fetchAllBlogs