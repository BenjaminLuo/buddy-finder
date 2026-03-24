import React from 'react';
import { Typography, Container, Avatar } from '@mui/material';

export const profileInformation = (user) => {
    return (
        <Container>
            <Avatar sx={{ height: 150, width: 150, fontSize: 70, margin: '40px auto', bgcolor: 'primary.main' }}>
                {user.display_name && user.display_name.charAt(0)}
            </Avatar>
            <Container sx={{ ml: 1 }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    {user.display_name}
                </Typography>
                <Typography sx={{ fontSize: 20, fontStyle: 'italic', mb: 1, color: 'text.secondary' }}>
                    {user.program}
                </Typography>
                <Typography sx={{ fontSize: 16, color: 'text.primary' }}>
                    {user.bio}
                </Typography>
            </Container>
        </Container>
    );
};
