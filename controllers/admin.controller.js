const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../models/User");

exports.all = (req, res) => {
  User.find(function(err, result) {
    if (err) {
        err = "Sorry, No records Found";
       return res.render('admin_index',{ rest : result , 'err' : err});
    }if (!result) {
      res.render('users',{rest : result , err : "No Record Found"});
    }
    if (result) {
    res.render('users',{ user : result });
    console.log(result);
    }
  });
};

exports.delete = async (req, res) => {
const id = { _id: req.params.id };
User.find((err,result)=>{
  if (result) {
      User.findByIdAndDelete( id ,(err,result)=>{
      if (err) {
           return res.render('users',{ user : result , err : "Failed to delete record, try again" });
        }
      });   
  res.redirect('/admin/user');
  }
  });
}; 

exports.updated = async (req, res) => {
  const id = { _id: req.params.id };
  User.findById(id,function(err,result){
  if (err) throw err;
   res.render('update',{ res : result});
     });
  };

exports.adminupdate = async (req, res) => {
  let err = [];
    const salt = await bcrypt.genSalt(10 );
    const hashpasswd = await bcrypt.hash(req.body.password, salt);
  name = req.body.name; 
  email = req.body.email; 
  password = hashpasswd;
  const all = {name , email , password} ;
  console.log(all);
  const hyy = { $set: all};
  const id =  req.body.id;
  User.findByIdAndUpdate(id, hyy ,function(err,result){
  if (err) {
    res.render('users',{user : result , err : "Error during Update, please try again"});
  }
   res.redirect('/admin/user');
     });
  //res.send(await userS.findById(req.params.id));
  };

  exports.adminAdded =  async (req,res) => {
  let err = [] ;
  let success_msg = [];
  const { name, email, password } = req.body;
    //  Check if user is already exist in database or not
  const emailExist = await User.findOne({email : req.body.email});
  if (emailExist) {
    res.render('add_user',{ err : "Email Already Exist, Please choose different" });
  }
  if (!emailExist){
  // Hash Password
    const salt = await bcrypt.genSalt(10 );
    const hashpasswd = await bcrypt.hash(req.body.password, salt);
      //  Create a New User
  const user = new User({
    name : req.body.name,
    email : req.body.email,
    password : hashpasswd,
  });
  try{
    const saveUser = await user.save();
    return res.redirect('/admin/user');
  }catch(err){
    console.log(err);
  }
};
};