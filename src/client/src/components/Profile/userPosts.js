import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';

export const userPosts = (user) => {
    return (
        <Paper sx={{ p: 2, my: 2 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Posts</Typography>
            <Grid container spacing={1}>
                {user.posts?.map((post, index) => (
                    <Grid item xs={12} key={index}>
                        <Typography>{post}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};
