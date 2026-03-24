import React from 'react';
import {
    Typography,
    Box,
    Card,
    Grid,
    Button
} from '@mui/material';

const IncompleteGoals = ({ goals, onUpdate }) => {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
                Incomplete Goals
            </Typography>
            {goals.map((goal, index) => (
                <Card key={index} sx={{ p: 2, mb: 1 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={8}>
                            <Typography>{goal.goal}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                                onClick={() => onUpdate(goal.id)}
                                sx={{ height: 30, mt: 1 }}
                            >
                                Mark as Completed
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            ))}
        </Box>
    );
};

export default IncompleteGoals;
