import React, { useEffect } from 'react';
// import Icon from '@mui/material/Icon';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@mui/material';
import { setSnackbar } from '../../redux/ducks/snackbar';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as api from '../../api/index';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';

const Header = ({ setOpenPopup, headerName, isCreatableButton = true }) => {
  const { t, i18n, ready } = useTranslation();
  headerName = t('songtable.header');
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  // const headerName = 'Employee';
  const disableButton = useSelector((state) => state.disableDelete.disable);
  const deleteData = useSelector((state) => state.disableDelete.data);
  const handleOnClickDelete = (e) => {
    if (disableButton) {
      dispatch(setSnackbar(true, 'error', 'Select one item to delete'));
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    const deleteId = deleteData[0].map((item) => {
      return item.id;
    });

    // const status = await api.deleteEmpoyee(deleteId);

    // if (status == 200) {
    //   dispatch(setSnackbar(true, 'success', 'Deleted successfully'));
    // }
    setOpen(false);
  };

  return (
    <>
      <div className="header px-4 mt-3">
        <div className="header-name">
          <h3 style={{ fontWeight: 'bold', fontSize: 'large' }}>
            {headerName}
          </h3>
        </div>
        <div className="header-action">
          {isCreatableButton ? (
            <AddCircleIcon
              fontSize="large"
              className="icon"
              onClick={() => setOpenPopup(true)}
            />
          ) : (
            <EditIcon
              fontSize="large"
              className="icon"
              onClick={() => {
                setOpenPopup(true);
              }}
            />
          )}
          <DeleteRoundedIcon
            fontSize="large"
            className="icon"
            color={disableButton ? 'disabled' : 'inherit'}
            disabled={disableButton}
            onClick={(e) => handleOnClickDelete(e)}
          />
        </div>
      </div>
      <hr />
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {'Are you sure to delete the items that you selected?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            By clicking agree, all items will be deleted and can't be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
