import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { connect, useDispatch } from "react-redux";
import { parseCandidate } from "../../actions/candidate";
import { CloudUpload } from "@material-ui/icons";

function MultipleUpload(props) {
  const { openDialog, closeDialog, loader } = props;
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const dispatch = useDispatch();
  const handleClose = () => {
    setSelectedFiles([]);
    setOpen(false);
    closeDialog(false);
  };

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  const selectFiles = (e) => {
    setSelectedFiles(e.target.files);
  }

  const handleUpload = () => {
    dispatch(parseCandidate(selectedFiles)).then(res => {
        setOpen(false);
        closeDialog(false);
        window.location.reload();
    })
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="upload"
    >
      <DialogTitle className="text-center" id="alert-dialog-title"><div>Upload Bulk Files</div>
      </DialogTitle>
      <DialogContent  style={{border:"1px dashed grey",marginLeft:"20px",marginRight:"20px",background:"rgb(226 239 255)"}}>
      <DialogContentText className="text-center "  id="alert-dialog-description">
         <CloudUpload style={{width:"65px", height:"86px",color:"#bbaeaef0"}} />
        </DialogContentText>
        <DialogContentText className="text-center " id="alert-dialog-description">
          {!selectedFiles.length && 
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: "none" }}
              type="file"
              multiple
              onChange={selectFiles}
            />
            <Button style={{background:"#3f51b5",color:"white"}}
              className=""
              variant="contained"
              
              //   disabled={selectedFiles?.length}
              component="span"
            >
              Browse Files 
            </Button>
          </label> }
        </DialogContentText>
        {selectedFiles.length ?
            <>
            <div style={{fontWeight: 'bold'}}>Selected Files</div>
            {Array.from(selectedFiles).map(file => {
                return (
                    <li>{file.name}</li>
                )
            })}
            </>
         : ''}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loader} color="primary">
          Cancel
        </Button>
        {!loader ? 
        <Button onClick={handleUpload} color="primary" autoFocus>
          Upload
        </Button> : <b>Uploading...</b> }
      </DialogActions>
    </Dialog>
  );
}


function mapStateToProps(state) {
    const { loader } = state.candidate;
    return {
        loader,
    };
  }
  
  export default connect(mapStateToProps)(MultipleUpload);