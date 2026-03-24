import React from 'react';
import { Typography } from '@mui/material';

const ConfirmationMessage = () => {
    return (
        <React.Fragment>
            <Typography variant="h5" sx={{ color: 'text.primary' }}>
                Thank you for your message! We will get back to you as soon as possible.
            </Typography>
        </React.Fragment>
    )
}

export default ConfirmationMessage;
