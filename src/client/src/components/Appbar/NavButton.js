import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Typography
} from '@mui/material';

// Function for creating navigation buttons
export const NavButton = ({ redirect, linkText }) => {
    const navigate = useNavigate();
    return (
        <Button
            onClick={() => navigate(redirect)}
            sx={{ my: 2, display: 'block', ml: '15px', textTransform: 'none' }}>
            <Typography variant="h6"> {linkText} </Typography>
        </Button>
    );
};