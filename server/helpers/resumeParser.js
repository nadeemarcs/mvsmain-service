const mammoth = require("mammoth");
const ResumeParser = require('simple-resume-parser');
const logger = require('../../config/logger');
const fs = require('fs');
const pdf = require('pdf-parse');

let resumeParser = async (resumePath) => {
  try {
    logger.debug("inside resumes", resumePath);
    const resume = new ResumeParser(resumePath);
    let parsedValue = await resume.parseToJSON();
    logger.debug(parsedValue);
    parsedValue.parts.filePath = resumePath;
    return parsedValue;
  } catch (error) {
    return { filePath: resumePath }
  }
}

let pdfResumeParser = async (resumePath) => {
  try {
    logger.debug("inside pdf resume parser", resumePath);
    let dataBuffer = fs.readFileSync(resumePath);
    let data = await pdf(dataBuffer)
      // logger.debug(data.text);
      return data.text ? data.text : "";
  }
  catch (err) {
    logger.fatal(err);
    return "";
  }
}

let docResumeParser = async (resumePath) => {
  try {
    logger.debug("inside doc resume parser", { resumePath })
    let result = await mammoth.extractRawText({ path: resumePath })
    var text = result.value; // The raw text 
    console.log(text);
    logger.debug(typeof text);
    return text;
  } catch (error) {
    logger.fatal(error);
    return "";
  }
}

module.exports = {
  resumeParser,
  pdfResumeParser,
  docResumeParser
}