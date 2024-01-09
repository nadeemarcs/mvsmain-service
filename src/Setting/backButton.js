import React from 'react'

import {
    Grid,
    Card,
    CardContent,
    Box,
    Link
  } from "@material-ui/core";
import { ArrowBack } from '@material-ui/icons';

function backButton() {
    return (
        <div>
          <Grid>
        <Card >
           <CardContent style={{ marginTop: "2px", backgroundColor: "#F9F9F9" }}>
            <Grid item>
              <Box display="flex" p={0} >
                <Box p={0} flexGrow={1} style={{ marginTop: "4px" ,marginBottom:"10px",marginLeft:"10px"}}>
                  <span style={{ border: "1px solid white", backgroundColor: "white", borderRadius: "4px", padding: "6px 7px", marginLeft: "5px", marginRight: "50px"}}>
                    <Link href="/jobopening">
                      <ArrowBack />
                    </Link>
                  </span>
                  <span>
                    Home &gt; <span style={{color:"#00256F"}}>Setting</span>
                  </span>
                </Box>
                <Box p={1}>
               
                </Box>
              </Box>
            </Grid>
          </CardContent>  
          </Card>
          </Grid>
        </div>
    )
}

export default backButton
