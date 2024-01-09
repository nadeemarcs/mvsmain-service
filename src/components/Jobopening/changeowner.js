import React from "react";
import CloseIcon from "@material-ui/icons/Close";

import {
  Grid,
  
  Card,
  CardContent,
  Typography,
  Select,
  InputLabel,
  FormControl,
  makeStyles,
  Button,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

 function App() {

    const classes = useStyles();
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (
    <div>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "20px auto" }}>
          <CardContent>
            <Grid item>
              <div style={{ width: "100%" }}>
                <Box display="flex" p={0} bgcolor="background.paper" style={{paddingTop:"10px",paddingLeft:"21px",backgroundColor:"#80808014",margin:"0px -21px",marginTop:"-36px"}}>
                  <Box p={0} flexGrow={1}>
                    <Typography variant="h6" gutterBottom align="left">
                    <span>Change Account Manager</span>
                        
                    </Typography>
                    </Box>
                  
                  <Box p={1} flexGrow={0}>
                  <Typography  >
                  <a href="/jobopening" >
                          <CloseIcon />
                   </a>
              </Typography>
                  </Box>
                </Box>
              </div>
            </Grid>
            <div style={{fontSize:"15px",marginBottom:"20px",marginTop:"10px"}}>Transfer Job opening from one user to another. All associated open tasks and events will transferred to new owner.</div>
              
          
                <Grid item>
              <Box display="flex" p={0} bgcolor="background.paper">
                <Box p={0} flexGrow={0}>
                <Grid xs={12} sm={6} item>
               
               <FormControl
                     fullWidth
                     size="small"
                     
                     className={classes.formControl}
                   >
                     <InputLabel htmlFor="outlined-age-native-simple">
                     Change Owner
                     </InputLabel>
                     <Select
                       native
                       value={2}
                       onChange={handleChange}
                       label="Job Opening status"
                       inputProps={{
                         name: "age",
                         id: "outlined-age-native-simple",
                       }}
                     >
                       <option aria-label="None" value="" />
                       <option value={1}>Ahmmad Nehal</option>
                       <option value={2}>Ahmad Yasir</option>
                       <option value={3}>Ali Mir</option>
                       <option value={4}>Farooque Mohammad</option>
                       <option value={5}>Gupta John</option>
                      
                       
                     </Select>
                   </FormControl>
               </Grid>
                </Box>
                <Box p={1} flexGrow={0}>
                  
                  <Button
                    variant="contained"
                    align="right"
                    size="small"
                    style={{
                        marginLeft:"40px",
                      maxWidth: "126px",
                      minWidth: "70px",
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    color="Secondary"
                    align="right"
                    size="small"
                    style={{
                     marginLeft:"10px",
                      maxWidth: "126px",
                      minWidth: "70px",
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Grid>
                <CardContent>
           
          </CardContent>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
export default App;
