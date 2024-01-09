import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
import { deleteCandidate, getCandidates } from '../../actions/candidate';
import { deleteJob, getJobs } from '../../actions/job';
import { deleteClient, getClients } from '../../actions/client';
import { deleteVendor, getVendors } from '../../actions/vendor';

export default function DeleteDialog(props) {

    const { openDialog, closeDialog, data, modalType } = props;
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
        closeDialog(false)
      };

    useEffect(() => {
        setOpen(openDialog)
    }, [openDialog])

    const handleDelete = () => {
        if (modalType === 'job') {
            dispatch(deleteJob(data?.id)).then(() => {
                setOpen(false);
                dispatch(getJobs());
              });
        } else if (modalType === 'candidate') {
            dispatch(deleteCandidate(data?.id)).then(() => {
                setOpen(false);
                dispatch(getCandidates(1,20)).then(() => window.location.reload());
              });
        } else if (modalType === 'client') {
            dispatch(deleteClient(data?.id)).then(() => {
                setOpen(false);
                dispatch(getClients());
              });
        }
        else if (modalType === 'vendor') {
            dispatch(deleteVendor(data?.id)).then(() => {
                setOpen(false);
                dispatch(getVendors());
              });
        }
        
    }

    function DeleteTitle() {
        let title = data?.jobTitle;
        switch (modalType) {
            case 'job':
                title = data?.jobTitle;
                break;
            case 'candidate':
                title = data?.firstName + " " + data?.lastName;
                break;
            case 'client':
                title = data?.name;
                break;
            default:
                break;
            
        }
        return (
            <b>{title}</b>
        )
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{`Delete ${modalType.charAt(0).toUpperCase()}${modalType.slice(1)}`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Are you sure you want to delete {`${modalType}`} - <DeleteTitle />?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}