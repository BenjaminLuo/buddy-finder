import React from 'react';
import {
    Modal,
    Box
} from '@mui/material';
import SignIn from '../Authentication/SignIn';

export function SignInModal({ open, handleClose }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '33%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} data-testid="auth-modal">
                <SignIn />
            </Box>
        </Modal>
    );
}
