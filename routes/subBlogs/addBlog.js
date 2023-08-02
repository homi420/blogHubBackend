const path = require("path")

const addBlog = async (req, res, Blogs) => {
    const id = req.user.id;
    const { title, description, image, author } = req.body;

    try {
        const blog = await Blogs.create({
            user: id,
            title: title,
            description: description,
            image: image,
            author: author
        });

        res.json({ success: true, msg: "The Blog Has Been Created Successfully" });
    } catch (err) {
        console.error("Error creating blog:", err);
        res.status(500).json({ success: false, msg: "Failed to create blog" });
    }

}
module.exports = addBlog;