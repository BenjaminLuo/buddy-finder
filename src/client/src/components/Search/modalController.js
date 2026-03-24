import React from 'react';
import { Box, Modal } from '@mui/material';
import Profile from '../../components/Profile';

// Controls opening and closing of modals
export function modalController(open, handleClose, classes, user) {
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box className={classes.modal}>
                <Profile userID={user} />
            </Box>
        </Modal>
    );
}
