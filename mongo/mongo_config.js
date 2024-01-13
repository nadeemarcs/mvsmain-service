
const mongoose = require('mongoose'),
fs = require('fs');

// let ca = [fs.readFileSync(__dirname + "/../../certs/rds-combined-ca-bundle.pem")];
var options = {
  // sslValidate:true,
  // sslCA:ca,
  useNewUrlParser: true ,
  autoIndex: false, // Don't build indexes
  poolSize: 100, // Maintain up to 100 socket connections
  bufferMaxEntries: 0,
  useUnifiedTopology: true,
};

var getRequestString = function(callback){
  console.log('Connecting with Local Mongo Db');
  //var requestString = "mongodb://localhost:27017/ATSDBTEST";

  var requestString ="mongodb://mvsatsmongo:6FshTcq823HUJ71uzQVcWl9RNS0EOudRRqxcv8yKhOPOlaBbnXn2F9sOgfJ9lNpzeh0eQkyuJHAnACDbL40luQ%3D%3D@mvsatsmongo.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@mvsatsmongo@";
  //var requestString = process.env.LOCAL_MONGO_DB_URI;
  callback(requestString);
}

exports.makeConnection = function(callback){
  console.log('Making mongo connection');
  getRequestString(function(requestString){
  console.log('request String: '+requestString);
  mongoose.set("strictQuery", false);
    mongoose.connect(requestString, options, function(error,result) {
      if(error){
        console.log('MongoDB connection error : ');
        console.log(error);
      }else{
        console.log('MongoDB connected ');
        //console.log(result)
      }
    });
    callback(mongoose)
  })
}


