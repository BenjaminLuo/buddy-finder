import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const SiteInformation = () => {
    return (
        <Container>
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h3">
                    Contact Us!
                </Typography>
                <hr style={{ width: '10%', margin: 'auto', borderColor: 'primary.main' }} />
                <Typography sx={{ p: 6 }}>
                    We'd love to hear from you. Please send us a message and we'll get back to you as soon as possible.
                </Typography>
            </Box>
        </Container>
    );
}

export default SiteInformation;
