import React from "react";
import WorkIcon from "@material-ui/icons/Work";
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
        <Card style={{ maxWidth: 500, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Grid item>
              <div style={{ width: "100%" }}>
                <Box display="flex" p={0} bgcolor="background.paper">
                  <Box p={0} flexGrow={1}>
                    <Typography variant="h6" gutterBottom align="left">
                      <span style={{ marginRight: "4px" }}>
                        <WorkIcon />
                      </span>
                      <span
                        style={{ border: "1px solid gray", padding: "0px 2px" }}
                      >
                        Job Title- Ui/Ux Developer
                        <span style={{ marginLeft: "10px" }}> 08-09-2021</span>
                      </span>
                    </Typography>
                  </Box>
                  <Box p={1} flexGrow={1}>
                    <Typography>
                      <a href="/jobopening">
                        <CloseIcon />
                      </a>
                    </Typography>
                  </Box>
                </Box>
              </div>
            </Grid>

            <Grid xs={12} sm={6} item>
              <FormControl
                fullWidth
                size="small"
                className={classes.formControl}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Job Opening status
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
                  <option value={1}>In Progress</option>
                  <option value={2}>Active</option>
                  <option value={3}>On Hold</option>
                  <option value={4}>Interviewing</option>
                  <option value={5}>Filed</option>
                  <option value={6}>Upcoming</option>
                  <option value={7}>Waiting for Approval</option>
                  <option value={8}>Closed</option>
                  <option value={9}>Cancelled</option>
                  <option value={10}>Hired</option>
                </Select>
              </FormControl>
            </Grid>
            <CardContent>
              <Grid item>
                <div style={{ width: "100%" }}>
                  <Box display="flex" p={0} bgcolor="background.paper">
                    <Box p={0}>
                      <Button
                        variant="contained"
                        align="left"
                        size="small"
                        style={{
                          margin: "0px 5px",
                          maxWidth: "140px",
                          minWidth: "126px",
                        }}
                      >
                        Job Description
                      </Button>
                      <Button
                        variant="contained"
                        align="left"
                        size="small"
                        style={{
                          margin: "0px 5px",
                          maxWidth: "126px",
                          minWidth: "126px",
                        }}
                      >
                        Notes
                      </Button>
                    </Box>
                  </Box>
                </div>
              </Grid>
            </CardContent>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
export default App;
