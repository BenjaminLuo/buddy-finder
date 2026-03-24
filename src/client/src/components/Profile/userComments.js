import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';

export const userComments = (user) => {
    return (
        <Paper sx={{ p: 2, my: 2 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Comments</Typography>
            <Grid container spacing={1}>
                {user.comments?.map((comment, index) => (
                    <Grid item xs={12} key={index}>
                        <Typography>{comment}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};
