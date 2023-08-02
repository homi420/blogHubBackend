const fetchBlogs = async(req,res,Blogs)=>{
    const id = req.user.id;
    const blogs  = await Blogs.find({user:id})
    res.json({success:true,msg:"Blogs Loaded Successfully",blogs})
    
}
module.exports = fetchBlogs