import React, { useContext, useState } from 'react';
import { AuthContext } from '../Authentication/AuthDetails';
import GetFetch from '../common';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Alert,
  Snackbar,
  Avatar,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const Contact = () => {
  const { authUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!body) newErrors.body = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    GetFetch('contactUs', {
      name,
      email,
      body,
      userID: authUser?.uid || 'anonymous'
    }).then(() => {
      setSubmitted(true);
      setSnackbar({ open: true, message: 'Message sent successfully!' });
    }).catch(() => {
      setSnackbar({ open: true, message: 'Failed to send message.' });
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <ContactSupportIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h2" gutterBottom color="primary.dark">
          Contact Us
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Have a question or feedback? We'd love to hear from you.
        </Typography>
      </Box>

      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        {submitted ? (
          <ConfirmationMessage />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={600}>Send a Message</Typography>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={6}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                error={!!errors.body}
                helperText={errors.body}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<SendIcon />}
                onClick={handleSubmit}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity="success" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const ConfirmationMessage = () => (
  <Box sx={{ textAlign: 'center', py: 6 }}>
    <Avatar sx={{ bgcolor: 'success.light', width: 80, height: 80, mx: 'auto', mb: 3 }}>
      <MarkEmailReadIcon sx={{ fontSize: 48, color: 'white' }} />
    </Avatar>
    <Typography variant="h4" fontWeight={700} gutterBottom>
      Thank You!
    </Typography>
    <Typography variant="h6" color="text.secondary">
      Your message has been received. We'll get back to you shortly.
    </Typography>
  </Box>
);

export default Contact;
