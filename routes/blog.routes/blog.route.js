const router=require('express').Router();
const {createBlog, getBlog, updateBlog, updateBlogImage, deleteBlog}=require('../../controllers/blog.controller');


const {upload}=require('../../middlewares/multer.middleware');
// upload.single('image');
// upload.array('image',5)                         //for multiple images required
const blogUpload=upload.fields([
    {name: 'image' ,maxCount:1},
    {name: 'authorImage' ,maxCount:1},
]);

router.route("/").post(blogUpload,createBlog).get(getBlog);
router.route("/:blogId").patch(updateBlog);
router.route("/:blogId/image").patch(blogUpload,updateBlogImage);
router.route("/:blogId").delete(deleteBlog);

module.exports=router;