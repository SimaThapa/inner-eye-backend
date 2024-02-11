const router=require('express').Router();
const {createGallary, deleteGallary, getGallary}=require("../../controllers/gallary.controller");
const {upload}=require("../../middlewares/multer.middleware");

router.route("/").post(upload.array('image',10),createGallary).delete(deleteGallary).get(getGallary);


module.exports=router;