const logger = require('../../config/logger');
const userService = require('../service/userServices');
const jwt = require('jsonwebtoken');
const models = require('../../models');
const Op = models.Sequelize.Op;
const bcrypt = require('bcryptjs');
const {searchCandidates} = require('../service/candidateServices');
const {searchClients} = require('../service/clientServices');
const {searchJobs} = require('../service/jobServices');
const {searchVendors} = require('../service/vendorServices');

var getCurrentTime = function(){
  var currTime =  new Date()//.toISOString();
  var month  = currTime.getMonth() + 1;
  currTime = currTime.getFullYear()+ '-' +month+ '-' +currTime.getDate()+' '+currTime.getHours()+':'+currTime.getMinutes()+':'+currTime.getSeconds();
  return currTime;
}

const userLogin = (req,res,next)=>{
  logger.debug("inside userLogin controller");
  var userData = req.body;
  userService.userLogin(userData)
  .then(data=>{
    logger.debug("data found",data);
    let payload = {
      "email" : data.email,
      "id":data.id,
    }
    data.token =  jwt.sign(payload,'my_secret_key',{ expiresIn: 60*60*24*30 });
    models.users.update({sessionKey:data.token},{where:{email:data.email}});
		logger.debug("Response from model: " + JSON.stringify(data));
    res.json({"success":true, "data":data});
  }).catch(err=>{
    return res.json({"success":false,"message":err});
  });
}

const addUser = async (req,res,next)=>{
  logger.debug("inside addUser controller");
  let userData = req.body;
  const salt = await bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(userData.password, salt);
  userData.password = hashPassword;
  logger.debug(userData);
  userService.addUser(userData).then(data=>{
    return res.json({"success":true,"message":data});
  }).catch(err=>{
    logger.fatal(err)
    return res.json({"success":false,"message":err.message});
  });
  
} 

const updateUser = async (req,res,next)=>{
  logger.debug("inside updateUser controller");
  let userData = req.body;
  let id = parseInt(req.params.id);
  logger.debug(userData);
  userService.updateUser(userData,id).then(data=>{
    return res.json({"success":true,"message":data});
  }).catch(err=>{
    logger.fatal(err)
    return res.json({"success":false,"message":err.message});
  });
  
} 

const getUserList = (req,res,next)=>{
  logger.debug("inside getUserList controller");
  let condition = {};
  userService.getUserList(condition).then(data=>{
    return res.json({"success":true, "data":data});
  }).catch(err=>{
    return res.json({"success":false,"message":err});
  });
}

const getUserProfile = (req,res,next)=>{
  logger.debug("inside getUserList controller");
  let condition = {id:req.params.id};
  userService.getUserProfile(condition).then(data=>{
    return res.json({"success":true, "data":data});
  }).catch(err=>{
    return res.json({"success":false,"message":err});
  });
}

const searchAll = async(req,res,next)=>{
  logger.debug("inside search all controller");
  let query = req.query.query;
  try{
    let obj = {};
    obj.candidates = await searchCandidates(query);
    obj.clients = await searchClients(query);
    obj.jobs = await searchJobs(query);
    obj.vendors = await searchVendors(query);
    return res.json({"success":true, "data":obj});
  }
  catch(err){
    return res.json({"success":false,"message":err});
  }
}

const deleteUser = (req,res,next)=>{
  logger.debug("inside delete UserList controller");
  let condition = {id:req.params.id};
  if(req.payLoad.email === "kk@federalsoftsystems.com"){
    userService.deleteUser(condition).then(data=>{
      return res.json({"success":true, "data":data});
    }).catch(err=>{
      return res.json({"success":false,"message":err});
    });
  }
  else{
    return res.json({"success":false,"message":"cannot delete user"});
  }
}


module.exports = {
  userLogin,
  addUser,
  getUserList,
  getUserProfile,
  searchAll,
  updateUser,
  deleteUser
};