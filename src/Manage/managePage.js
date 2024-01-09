import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid } from "@material-ui/core";
import './manage.css'
function ManagePage() {
  return (
    <>
      <div
        className="px-md-4 p-2 "
        style={{ marginLeft: "60px", marginTop: "40px" }}
      >
        <div style={{ display: "flex" }}>
          <Grid container spacing={5}>
            <Grid xs={12} sm={6} md={6} item>
              <Card
                variant="outlined"
                style={{ width: "448px", height: "205px" }}
              >
                <CardContent>
                  <div className="admin" style={{fontSize:"17px",fontWeight:"500"}}>Super Admin</div>
                  <hr style={{marginLeft:"-16px",marginRight:"-16px"}}></hr>
                  <div className="detailAdmin">
                    They can see and do everything – best not to have many with
                    this role.
                  </div>
                  <div className="viewPermission">View Permission</div>
                </CardContent>
              </Card>
            </Grid>

            <Grid xs={12} sm={6} md={6} item > 
              <Card 
                variant="outlined"
                style={{ width: "448px", height: "205px",marginLeft:"60px" }}
              >
                <CardContent>
                  <div className="admin" style={{fontSize:"17px",fontWeight:"500"}}> Admin </div>
                  <hr style={{marginLeft:"-16px",marginRight:"-16px"}}></hr>
                  <div className="detailAdmin">
                    Admin to help sort stuff, but have less access to
                    confidential information like salaries.
                  </div>
                  <div className="viewPermission" >View Permission</div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
      <div
        className="px-md-4 p-2 "
        style={{ marginLeft: "60px", marginTop: "40px" }}
      >
        <div style={{ display: "flex" }}>
          <Grid container spacing={5}>
            <Grid xs={12} sm={6} md={6} item>
              <Card
                variant="outlined"
                style={{ width: "448px", height: "205px" }}
              >
                <CardContent>
                  <div className="admin" style={{fontSize:"17px",fontWeight:"500"}}>Team Members</div>
                  <hr style={{marginLeft:"-16px",marginRight:"-16px"}}></hr>
                  <div className="detailAdmin">
                  Team Members have the most limited access – most people should have this role.

                  </div>
                  <div className="viewPermission">View Permission</div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default ManagePage;
