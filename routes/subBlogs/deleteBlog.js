const deleteBlog = async (req, res, Blogs) => {
    const id = req.user.id;
    const blogId = req.params.id
    const blog = await Blogs.findById(blogId)
    if (blog.user.toString() !== id) {
        res.status(400).json({ success: false, error: "Please Authenticate Using the valid Token..." });
    }
    else {
        await Blogs.findByIdAndDelete(blogId);
        res.json({success:true,msg:"Blog Has Been Deleted Successfully..."})
    }
}
module.exports = deleteBlog