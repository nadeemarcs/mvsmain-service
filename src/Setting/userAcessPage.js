import React, { useEffect, useState } from "react";
import "./setting.css";
import { Grid, CardContent, Box, DialogTitle, Dialog,Button, DialogContent, DialogActions, DialogContentText } from "@material-ui/core";
import MaterialTable from "material-table";
import { AccountCircleOutlined, AddBoxOutlined, Close } from "@material-ui/icons";
import { connect, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../actions/auth";
import Register from '../components/Register'
import { toast } from "react-toastify";
const UserAcessPage = (props) => {

  const dispatch = useDispatch();
  const { usersList,user: currentUser, } = props;
  const [selectedUser, setSelectedUser] = useState();
  const [ showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const { profile=[] } = props;
  const [open , setOpen] = useState(false);
  const { status } = props;
  useEffect(() => {
    dispatch(getUsers());
  }, [deleteStatus]);


  const handleClose = (e) => {
    if(e === 'yes'){
      try{
        dispatch(deleteUser(selectedUser.id)).then((res)=>{
          if(res.success){
            toast.success(res.data);
            setDeleteStatus(!deleteStatus);
            setSelectedUser(null); 
          }else{
            toast.warning(res.message);
          }
        });
        setOpen(false);
      }catch(e){
        console.log(e);
      }
     
    }else{
      setOpen(false);
    }
  };
  return (
    <>
      {/* USer And Security control tab  */}

      <div className="acessPage mb-2" style={{ marginLeft: "17px" }}>
        <span className="border rounded p-2 bg-light">User Security Control</span>
      </div>

      {/* for userlist and Newuser Tab */}
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
    
      >
        <DialogTitle>{"Are You Sure?"}</DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-slide-description">
           User will be Deactivated And All Access Will Be Removed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose('yes')}>Yes</Button>
          <Button onClick={()=>handleClose('no')}>No</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Grid>
          
            <CardContent
              className="topBar"
            >
              <Grid item>
                <Box display="flex" p={0}>
                  <Box
                    p={0}
                    flexGrow={1}
                    style={{
                      marginTop: "4px",
                      marginBottom: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    <span className="userList"> User List </span>
                  </Box>
                  <Box  p={1} onClick={() => setShowRegistrationDialog(true)} style={{ cursor: 'pointer',marginTop:"-6px" }}>
                    <span className="addBox">
                     <span><AddBoxOutlined /></span>
                    <span> Add New User </span>
                    </span>
                  </Box>
                </Box>
              </Grid>
            </CardContent>
         
        </Grid>
      </div>

      {/* Admin,User,SuperAdmin grid */}
      <CardContent className="user-grid">
        <Grid container spacing={0}>
          <Grid xs={12} sm={6} item style={{border: " 1px solid #BEB9BA"}}>
            <MaterialTable
             
              columns={[
                // { title: "TITLE", field: "title" },
                { title: "FIRSTNAME", field: "firstName",},
                { title: "LASTNAME", field: "lastName" },
                { title: "EMAIL", field: "email" },
                
              ]}
              data={usersList}
              options={{
                pageSize: 10,
                pageSizeOptions: [10, 20],
                selection:true,
                search: false,
                showTitle: false,
                padding: "dense",
                draggable: false,
                sorting: false,
                toolbar: false,
              }}
              onSelectionChange={(e)=>{setSelectedUser(e[e.length - 1])}}
            />
          </Grid>
          <Grid xs={12} sm={6} item style={{border: " 1px solid #BEB9BA"}}>
          {selectedUser &&
            <>
            
            <div className="user-detail">
              <span style={{marginRight:"10px"}}><AccountCircleOutlined style={{fontSize:"58px",color:"#E7F8FF"}} /></span>
            <span className="userName"><span className="text-capitalize">{selectedUser.firstName}</span> <span className="text-capitalize">{selectedUser.lastName}</span></span> 
            <span className="active" style={{color:"white"}}>{selectedUser.status}</span>
            </div>
            <div className="interviewerStyling" style={{marginLeft:"220px",marginTop:"-16px"}}>
              <span className="interviewer">Title - {selectedUser.title}</span>
            </div>
            <div style={{marginLeft:"220px",marginTop:"20px"}}>
              <span className="gmailStyle"><span>{selectedUser.email}</span></span>
            </div>
            <div style={{marginLeft:"220px",marginTop:"15px"}}>
              <button className="Deactivate" onClick={()=>setOpen(true)}>Deactivate</button>
              <button className="DeleteUser" onClick={()=>setOpen(true)}>Delete This User</button>
            </div>
            
            </>
          }
          </Grid>
        </Grid>
      </CardContent>

      <Dialog 
        open={showRegistrationDialog}
        onClose={() => setShowRegistrationDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ width: "350px" }}
          className="bg-secondary text-white text-uppercase"
        >
          <Box display="flex" alignItems="center" >
            <Box flexGrow={1}>{"Add New User"}</Box>
            <Box>
              <Close 
                onClick={() => setShowRegistrationDialog(false)}
                className="text-white cursor-pointer"
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers style={{overflowY:"hidden"}}>
         <Register  closeDialog={(val) =>  { 
           setShowRegistrationDialog(val)
           dispatch(getUsers());
           }}/>
        </DialogContent>
      </Dialog>

    </>
  );
}


function mapStateToProps(state) {
  // const { userSelectedRow } = state.userselect;
  const { usersList } = state.auth;
  const { user } = state.auth;
  const { profile } = state.profile;
  const { status } = state.auth;
  return {
    // userSelectedRow,
    usersList,
    user,
    profile,
    status
  };
}

export default connect(mapStateToProps)(UserAcessPage);

