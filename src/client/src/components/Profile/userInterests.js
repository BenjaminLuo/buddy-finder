import React from 'react';
import { Typography, Grid, Paper, Chip } from '@mui/material';

export const userInterests = (user) => {
    return (
        <Paper sx={{ p: 2, my: 2 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Interests</Typography>
            <Grid container spacing={1}>
                {user.interests?.map((interest, index) => (
                    <Grid item key={index}>
                        <Chip label={interest} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};
