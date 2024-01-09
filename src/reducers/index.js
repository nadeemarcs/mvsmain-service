import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import job from "./job";
import client from "./client";
import candidate from "./candidate";
import upload from "./upload";
import vendor from "./vendor";
import pageloader from "./pageloader";
import notes from "./notes";
import log from "./log";
import reports from './reports';
import profile from './profile';

export default combineReducers({
  auth,
  message,
  job,
  client,
  candidate,
  upload,
  vendor, 
  pageloader,
  notes,
  log,
  reports,
  profile
});
