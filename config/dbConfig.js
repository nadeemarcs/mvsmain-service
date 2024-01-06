
//node_modules/.bin/sequelize model:generate --name users --attributes fullName:string,email:string,sessionKey:string,password:string,phoneNumber:string,companyName:string,isActive:boolean --force


//node_modules/.bin/sequelize model:generate --name employees --attributes employeeId:string,organizationName:string,userId:string --force

//node_modules/.bin/sequelize model:generate --name jobCandidateMappings --attributes jobId:integer,candidateId:integer,status:string --force

//node_modules/.bin/sequelize model:generate --name jobNotes --attributes jobId:integer,createdBy:integer,note:TEXT --force

//node_modules/.bin/sequelize model:generate --name candidateNotes --attributes candidateId:integer,createdBy:integer,note:TEXT --force

//node_modules/.bin/sequelize model:generate --name jobs --attributes jobTitle:string,recruiter:string,client:string,accountManager:string,jobLocation:string,jobType:string,state:integer,numberOfPosition:integer,zipCode:integer,duration:string,endClient:string,hourlyRate:string,salary:integer --force

//node_modules/.bin/sequelize model:generate --name candidate --attributes firstName:string,lastName:string,email:string,city:integer,PhoneNumber:integer,experience:integer,linkedIn:string,candidateStatus:string,createdBy:integer,ratings:integer--force

// node_modules/.bin/sequelize model:generate --name clients --attributes name:string,email:string,address:string,PhoneNumber:string,accountManager:integer,state:string,city:string,createdBy:integer,type:integer,website:string,status:string,industry:string,zipCode:integer,source:string,address:string--force

// node_modules/.bin/sequelize model:generate --name vendors --attributes name:string,email:string,emailOpt:string,einNumber:string,skills:JSON,address:JSON,PhoneNumber:string,contact:string,owner:integer,createdBy:integer,updatedBy:integer,website:string,status:string --force

// node_modules/.bin/sequelize db:migrate


//

//var conn=mysql.createConnection({host:"atsmysql.mysql.database.azure.com", user:"mavinadmin", password:"{your_password}", database:"{your_database}", port:3306, ssl:{ca:fs.readFileSync("{ca-cert filename}")}});