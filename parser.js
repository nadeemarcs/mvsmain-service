// const fs = require('fs');
// const readline = require('readline');
// const stream = require('stream');

// const searchStream = (filename, text) => {

//     return new Promise((resolve) => {
//         const inStream = fs.createReadStream('./Arif.docx');
//         const outStream = new stream;
//         const rl = readline.createInterface(inStream, outStream);
//         const result = [];
//         const regEx = new RegExp("node", "i")
//         rl.on('line', function (line) {
//             console.log({line});
//             if (line && line.search(regEx) >= 0) {
//                 result.push(line)
//             }
//         });
//         rl.on('close', function () {
//             console.log('finished search', filename)
//             console.log(result)
//         });
//     })
// }

// searchStream("1","test");



let textract = require('textract')
textract.fromFileWithMimeAndPath("docx","./Arif.docx", function( error, text ) {
    console.log(text);
})



// const http = require("https");

// const options = {
// 	"method": "POST",
// 	"hostname": "google-for-jobs-by-seo-for-jobs.p.rapidapi.com",
// 	"port": null,
// 	"path": "/jobs",
// 	"headers": {
// 		"x-api-token": "undefined",
// 		"x-rapidapi-key": "3e7a59a1eemsh3f9664ce940642fp1ffdfcjsn5046a0cc036f",
// 		"x-rapidapi-host": "google-for-jobs-by-seo-for-jobs.p.rapidapi.com",
// 		"useQueryString": true
// 	},
//     "body":{
//         "status":"PUBLISHED",
//         "title":"test",
//         "description":"test",
//         "employmentType":"INTERN",
//         "salaryCurrency":"INR",
//         "salaryValue":43000,
//         "salaryUnit":"MONTH",
//         "streetAndNo":"address",
//         "city":"NEW DELHI",
//         "postalCode":110037,
//         "countryCode":"IN",
//         "companyName":"test"
//     }
// };

// const req = http.request(options, function (res) {
// 	const chunks = [];

// 	res.on("data", function (chunk) {
// 		chunks.push(chunk);
// 	});

// 	res.on("end", function () {
// 		const body = Buffer.concat(chunks);
// 		console.log(body.toString());
// 	});
// });

// req.end();