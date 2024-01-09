import "../../App.css";
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import InfoRow from "../Candidates/InfoRow";
function App() {
  
  return (
    <div className="App">
      <Grid>
        <Card style={{ maxWidth: 1300, padding: "20px 5px", margin: "0px auto" }}>
          <CardContent>
            <Grid item>
              <div style={{ width: "100%" }}>
                <Box display="flex" p={1} bgcolor="background.paper">
                  <Box p={1} flexGrow={1}>
                    <Typography variant="h5" gutterBottom align="left">
                      <WhatshotIcon
                        style={{ color: "#b13131", margin: "0px 5px" }}
                      /><a href="/jobopeningview">
                      UI/UX Developer - Bank of West </a>
                      <div style={{ margin: "0px 40px", fontWeight: "100" }}>
                        <span style={{ border: "1px solid #9c8e8e" }}>
                          12 Months
                        </span>
                      </div>
                    </Typography>
                  </Box>
                  <Box p={1}>
                   
                  </Box>
                </Box>
              </div>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container spacing={3} style={{margin:"10px 0px"}}>
              <Grid item xs={12} md>
                <div style={{ fontWeight: "600" }}>Pipeine</div>
                <div style={{ fontWeight: "600" }}><a href="/pipeline" target="_self">4</a></div>
              </Grid>
              <Grid item xs={12} md>
                <div style={{ fontWeight: "600" }}>Client Submission</div>
                <div style={{ fontWeight: "600" }}><a href="/pipeline" target="_self">4</a></div>
              </Grid>
              <Grid item xs={12} md>
                <div style={{ fontWeight: "600" }}>Interview</div>
                <div style={{ fontWeight: "600" }}><a href="/pipeline" target="_self">4</a></div>
              </Grid>
              <Grid item xs={12} md>
                <div style={{ fontWeight: "600" }}>Offered</div>
                <div style={{ fontWeight: "600" }}><a href="/pipeline" target="_self">4</a></div>
              </Grid>
              <Grid item xs={12} md>
                <div style={{ fontWeight: "600" }}>Placement</div>
                <div style={{ fontWeight: "600" }}><a href="/pipeline" target="_self">4</a></div>
              </Grid>
            </Grid>
           <InfoRow/>
          </CardContent>
         
        </Card>
      </Grid>
    </div>
  );
}

export default App;
