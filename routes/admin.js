const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const  adminController = require('../controllers/admin.controller');


router.get('/user',(req,res)=>{
	res.redirect('/admin/all');
})
router.get('/add_user',(req,res)=>{
	res.render('add_user');
})
router.get('/all' ,  adminController.all);
router.get('/delete/:id',adminController.delete);
router.get('/update/:id', adminController.updated);
router.post('/admin_update',adminController.adminupdate);
router.post('/add_user',adminController.adminAdded);




module.exports = router;
