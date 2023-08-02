const editBlog = async (req, res, Blogs) => {
    const { title, description, image } = req.body
    const id = req.user.id;
    const blogId = req.params.id
    let newBlog = {}
    if (title) {
        newBlog.title = title;
    }
    if (description) {
        newBlog.description = description;
    }
    if (image) {
        newBlog.image = image
    }
    let blog = await Blogs.findById(blogId)
    if (!blog) {
        res.status(400).json({ success: false, error: "Blog Not Found..." });

    }
    if (blog.user.toString() !== id) {
        res.status(400).json({ success: false, error: "Not Allowed..." });
    }
    else {

        blog = await Blogs.findByIdAndUpdate(blogId, { $set: newBlog }, { new: true });
        res.json({ success: true, msg: "Blog Has Been Edited Successfully...", blog })
    }
}
module.exports = editBlog