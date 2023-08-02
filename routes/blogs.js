const express = require("express")
const router = express.Router();
const ev = require("express-validator")
const Blogs = require("../models/Blogs")
/* -+-+--+-+-+-+-+-+-+-+-+----------------+-+-+-+--+-+-+-+-+-+ */

// Importing all the functions here...
const fetch = require("../middleware/fetch")
// Blog Functions Here...
const addBlog = require("./subBlogs/addBlog")
const deleteBlog = require("./subBlogs/deleteBlog")
const editBlog = require("./subBlogs/editBlog")
const fetchBlogs = require("./subBlogs/fetchBlogs")
const fetchAllBlogs = require("./subBlogs/fetchAllBlogs")
const fetchBlog = require("./subBlogs/fetchBlog")
/* -+-+--+-+-+-+-+-+-+-+-+----------------+-+-+-+--+-+-+-+-+-+ */

//   /api/blog/addBlog     || Login Required ||


router.post("/addBlog", [ev.body("title", "The Title Should Not Be Empty").exists(), ev.body("description", "The Blog Can not Be Empty").exists(), ev.body("image", "You Must The Link For The Top Image").exists()], fetch, (req, res) => {
    const errors = ev.validationResult(req);


    if (!errors.isEmpty()) {
        res.status(400).json({ success: false, error: errors.array()[0].msg });
    }
    else {

        try {
            addBlog(req, res, Blogs)
        }
        catch (error) {
            res.status(500).json({ success: false, error: "Internal Server Error" })
        }
    }
})

/* -+-+--+-+-+-+-+-+-+-+-+----------------+-+-+-+--+-+-+-+-+-+ */

//   /api/blog/fetchBlogs     || Login Required ||

router.get("/fetchBlogs", fetch, (req, res) => {
    try {
        fetchBlogs(req, res, Blogs)
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
})

/* -+-+--+-+-+-+-+-+-+-+-+----------------+-+-+-+--+-+-+-+-+-+ */

//   /api/blog/deleteBlog/:id     || Login Required ||

router.delete("/deleteBlog/:id", fetch, (req, res) => {
    try {
        deleteBlog(req, res, Blogs)
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" })

    }
})
/* -+-+--+-+-+-+-+-+-+-+-+----------------+-+-+-+--+-+-+-+-+-+ */

//   /api/blog/editBlog/:id     || Login Required ||

router.put("/editBlog/:id", fetch, [ev.body("title", "The Title Should Not Be Empty").exists(), ev.body("description", "The Blog Can not Be Empty").exists()], (req, res) => {
    const errors = ev.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ success: false, error: errors.array()[0].msg });
    }
    else {
        try {
            editBlog(req, res, Blogs)
        }
        catch (error) {
            res.status(500).json({ success: false, error: "Internal Server Error" })

        }
    }
})

/* -+-+--+-+-+-+-+-+-+-+-+----------------+-+-+-+--+-+-+-+-+-+ */

//   /api/blog/fetchAllBlogs     ||  No Login Required ||

router.get("/fetchAllBlogs", (req, res) => {
    try {
        fetchAllBlogs(req, res, Blogs)
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
})

/* -+-+--+-+-+-+-+-+-+-+-+----------------+-+-+-+--+-+-+-+-+-+ */

//   /api/auth/fetchBlog        || No Login Required  ||

router.get("/fetchBlog/:id", (req, res) => {
    try {
        fetchBlog(req, res, Blogs)
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" })

    }
})


module.exports = router;