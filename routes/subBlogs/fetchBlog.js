const fetchBlog = async (req, res, Blogs) => {
    let blogId = req.params.id
    let blog = await Blogs.findById(blogId);
    if (!blog) {
        res.status(404).json({ success: false, error: "Blog Not Found!" })

    }
    else {
        res.json({ success: true, blog })
    }
}
module.exports = fetchBlog