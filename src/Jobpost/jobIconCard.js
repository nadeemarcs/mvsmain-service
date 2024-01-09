import React, {useState} from "react";
import logoAdzuna from "../Images/adzuna-logo-full.png";
import logoGoogle from "../Images/google-logo-full.png";
import logoMonster from "../Images/monster-logo-full.jpg";
import logoCarrier from "../Images/careerjet-logo-full.png";
import logoLinkedin from "../Images/linkedin-logo-full.png";
import logoFacebook from "../Images/facebook-logo-full.png";
import logoGlassdoor from "../Images/glassdoor-logo-full.png";
import logoIndeed from "../Images/indeed-logo-full.png";
import logoTalent from "../Images/talent.png";
import logoZip from "../Images/ziprecruiter-logo-full.png";
import logoJobisJob from "../Images/jobisjob-logo-full.png";
import logoJobrapido from "../Images/jobrapido-logo-full.png";
import logoDirectly from "../Images/directlyapply-logo-full.png";
import logoJobheper from "../Images/myjobhelper-logo-full.png";
import logoUpward from "../Images/upward-logo-full.png";
import logoJora from "../Images/jora-logo-full.png";
import logoDice from "../Images/dice-job-boards.png";
import logoNaukari from "../Images/naukri-job-boards.png";
import logoCarrierBuilder from "../Images/carrerbuilder-job-boards_0.png";
import logoTech from "../Images/techfetch-job-boards.png";
import logoJooble from "../Images/jooble_api.png";
import logoCarrierJet from "../Images/careerjet_api.png";
import logoReed from "../Images/reed_api.png";
import logoMuse from "../Images/the_muse_api.png";
import logoUpwork from "../Images/upwork.png";
import logoUsajob from "../Images/usajobs.png";
import logoFederal from "../Images/logo.jpeg";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
function JobIconCard() {
  const [job, setJob] = useState('');
  return (
    <>
      <div className="mx-2 my-2">
        <div className="ps-5 pe-3 border border-2 rounded">
          <div className="mt-4 text-uppercase fs-5">Career Site</div>
          <div className="row g-0 col-12 justify-content-between mt-2">
            <div className="col-12 col-md-6 col-lg-2 pe-4 ">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  className="card-body 
                          "
                  style={{ height: "115px" }}
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center ">
                      <div className="  col-9  ">
                        <div className="ms-2 d-flex flex-column ">
                          <img src={logoFederal} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className=" text-uppercase fs-5">Other Job Posting</div>
          <div className="" >
          <select className="form-select me-4" aria-label="Default select example"style={{width:"180px"}}>
  <option selected>select</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
          </div>
          </div>
          
          <div className="row g-0 col-12 justify-content-between mt-2">
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center ">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img src={logoAdzuna} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img src={logoGoogle} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img src={logoMonster} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center pt-4">
                      <div className=" col-9  ">
                        <div className=" ms-2 d-flex flex-column">
                          <img src={logoCarrier} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img src={logoUsajob} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 col-12 justify-content-between">
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img src={logoZip} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img src={logoTalent} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img src={logoIndeed} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img src={logoGlassdoor} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center pt-4">
                      <div className=" col-9  ">
                        <div className=" ms-2 d-flex flex-column">
                          <img src={logoFacebook} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 col-12 justify-content-between">
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img src={logoJobisJob} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                    <div className=" col-9  ">
                      <div className="ms-2 d-flex flex-column">
                        <img src={logoJobheper} alt="profile-img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img src={logoJobrapido} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img src={logoJora} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <div
                    className="row g-0 d-flex flex-row justify-content-center pt-4"
                    style={{ marginTop: "-13px" }}
                  >
                    <div className=" col-9  ">
                      <div className=" ms-2 d-flex flex-column">
                        <img src={logoDirectly} alt="profile-img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 col-12 justify-content-between">
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                    <div className=" col-9  ">
                      <div className="ms-2 d-flex flex-column">
                        <img src={logoUpward} alt="profile-img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div
                          className="ms-0 d-flex flex-column"
                          style={{ marginTop: "-12px" }}
                        >
                          <img
                            style={{
                              width: "200px",
                              height: "60px",
                              marginLeft: "-46px",
                            }}
                            src={logoDice}
                            alt="profile-img"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div
                          className="ms-0 d-flex flex-column"
                          style={{ marginTop: "-18px" }}
                        >
                          <img
                            style={{ width: "120px", height: "70px" }}
                            src={logoNaukari}
                            alt="profile-img"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div
                          className="ms-0 d-flex flex-column"
                          style={{ marginTop: "-19px" }}
                        >
                          <img
                            style={{ width: "120px", height: "70px" }}
                            src={logoCarrierBuilder}
                            alt="profile-img"
                            className=""
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center pt-4">
                      <div className=" col-9  ">
                        <div
                          className=" ms-0 d-flex flex-column"
                          style={{ marginTop: "-19px" }}
                        >
                          <img
                            style={{ width: "120px", height: "70px" }}
                            src={logoTech}
                            alt="profile-img"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 col-12 justify-content-between">
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img src={logoLinkedin} alt="profile-img" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img
                            src={logoJooble}
                            alt="profile-img"
                            style={{ marginTop: "-25px", height: "92px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img
                            src={logoCarrierJet}
                            alt="profile-img"
                            style={{ marginTop: "-10px", height: "60px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img
                            src={logoReed}
                            alt="profile-img"
                            style={{ marginTop: "-10px", height: "60px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img
                            src={logoMuse}
                            alt="profile-img"
                            style={{
                              marginTop: "-10px",
                              height: "60px",
                              width: "109px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 col-12 justify-content-between">
            <div className="col-12 col-md-6 col-lg-2 pe-4">
              <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                <div
                  style={{ height: "115px" }}
                  className="card-body 
                          "
                >
                  <a href="/postJobs">
                    <div className="row g-0 d-flex flex-row justify-content-center  pt-4">
                      <div className=" col-9  ">
                        <div className="ms-2 d-flex flex-column">
                          <img
                            src={logoUpwork}
                            alt="profile-img"
                            style={{ marginTop: "-24px", height: "75px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobIconCard;
