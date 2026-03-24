import React, { useContext, useState } from "react";
import { SignInModal } from '../Appbar/SignInModal';
import mainBackground from "../images/background.jpeg";
import { signOut, auth } from "../Auth/auth";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthDetails'

import {
  Typography,
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import ForumIcon from '@mui/icons-material/Forum';
import EventIcon from '@mui/icons-material/Event';

export default function Landing() {
  console.log('--- LANDING COMPONENT RENDERING ---');
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  const handleAuth = () => {
    if (authUser) {
      userSignOut();
      navigate("/");
    } else {
      handleOpen();
    }
  }

  const features = [
    {
      title: 'Activity Matching',
      desc: 'Find buddies for sports, study, or social hangouts based on your schedule.',
      icon: <GroupsIcon color="primary" sx={{ fontSize: 40 }} />
    },
    {
      title: 'Interest Forums',
      desc: 'Join discussions about your favorite topics and meet local communities.',
      icon: <ForumIcon color="secondary" sx={{ fontSize: 40 }} />
    },
    {
      title: 'Event Calendar',
      desc: 'Stay organized with shared events and personal goal tracking.',
      icon: <EventIcon color="primary" sx={{ fontSize: 40 }} />
    }
  ];

  return (
    <Box 
        sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(rgba(248, 250, 252, 0.7), rgba(248, 250, 252, 0.8)), url(' + mainBackground + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}
    >
      {/* Hero Section */}
      <Box 
        sx={{
          pt: { xs: 8, md: 15 },
          pb: { xs: 10, md: 20 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '4.5rem' },
              mb: 3,
              background: 'linear-gradient(135deg, #1e293b 0%, #4f46e5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Find Your Perfect Buddy
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ mb: 6, color: 'text.secondary', maxWidth: '700px', mx: 'auto', fontWeight: 600 }}
          >
            Connect with like-minded students, discover shared interests, and schedule activities together. Your next great friendship starts here.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              onClick={handleAuth}
              variant="contained"
              size="large"
              sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}
            >
              {authUser ? "Sign Out" : "Get Started Now"}
            </Button>
            {!authUser && (
              <Button
                variant="outlined"
                size="large"
                sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}
                onClick={() => navigate('/FAQ')}
              >
                Learn More
              </Button>
            )}
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: -8, pb: 10 }}>
        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card 
                sx={{ 
                  height: '100%', 
                  transition: 'transform 0.2s',
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(4px)',
                  '&:hover': { transform: 'translateY(-8px)' }
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{ mb: 3 }}>{f.icon}</Box>
                  <Typography variant="h5" gutterBottom>{f.title}</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {f.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal and sign in / registration form */}
      <SignInModal open={open} handleClose={handleModalClose} />
    </Box>
  );
}
