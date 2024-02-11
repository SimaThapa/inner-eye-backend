const router=require('express').Router();
const { createServiceRegitration, getServiceRegistration }=require('../../controllers/serviceRegistration');
router.route('/').post(createServiceRegitration).get(getServiceRegistration);

module.exports=router;