import React from 'react';
import { Typography, Box, Card } from '@mui/material';

const CompletedGoals = ({ goals }) => {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
                Completed Goals
            </Typography>
            {goals.map((goal, index) => (
                <Card key={index} sx={{ p: 2, mb: 1 }}>
                    <Typography>{goal.goal}</Typography>
                </Card>
            ))}
        </Box>
    );
};

export default CompletedGoals;
