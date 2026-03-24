import React from 'react';
import { Typography, TextField, Grid } from '@mui/material';

const SearchForUsers = ({ onInput }) => {
    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom>
                User Search
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={8} sx={{ margin: '0 auto' }}>
                    <TextField
                        id="search-for-users"
                        label="Search for users"
                        variant="outlined"
                        onChange={onInput}
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default SearchForUsers;
