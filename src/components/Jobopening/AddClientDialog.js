import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import CreateClient from "../Clients/createclientform";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function AddClientDialog(props) {
  const classes = useStyles();
  const { openDialog, closeDialog } = props;
  const [open, setOpen] = React.useState(false);



  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  const handleClose = () => {
    setOpen(false);
    closeDialog(false);
  };


  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        style={{ marginTop : 72 }}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar style={{ background : '#666666' }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Client
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="candidate" style={{ padding: 30 }}>
          <div style={{ marginTop: 20, marginBottom: 10 }}>
            <CreateClient handleCreateClientClose={handleClose}/>
          </div>
          
        </div>
      </Dialog>
    </div>
  );
}

export default AddClientDialog;
