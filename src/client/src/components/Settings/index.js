import React, { useContext, useEffect, useState } from 'react';
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
  FormControlLabel,
  Switch,
  Divider,
  Alert,
  Snackbar,
  Stack
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings = () => {
  const { authUser } = useContext(AuthContext);
  const [userSettings, setUserSettings] = useState({
    display_name: '',
    program: '',
    term: '',
    bio: '',
    private: false,
    searchable: true,
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    if (authUser?.uid) {
      GetFetch('getUserSettings', { userID: authUser.uid })
        .then(data => {
          if (data && data.length > 0) {
            setUserSettings({
              display_name: data[0].display_name || '',
              program: data[0].program || '',
              term: data[0].term || '',
              bio: data[0].bio || '',
              private: !!data[0].private,
              searchable: data[0].searchable === null ? true : !!data[0].searchable,
            });
          }
        });
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setUserSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (field, value) => {
    GetFetch('updateUserSettings', {
      fieldToChange: field,
      newVal: value,
      userID: authUser.uid
    }).then(() => {
      setSnackbar({ open: true, message: `${field.replace('_', ' ')} updated successfully!` });
    }).catch(() => {
      setSnackbar({ open: true, message: `Failed to update ${field}.` });
    });
  };

  const handleAllSubmit = () => {
    Object.entries(userSettings).forEach(([field, value]) => {
      handleSubmit(field, value);
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <SettingsIcon color="primary" sx={{ fontSize: '2.5rem' }}/>
        <Box>
            <Typography variant="h2" color="primary.dark">
                Account Settings
            </Typography>
            <Typography variant="h6" color="text.secondary">
                Manage your public profile and privacy settings.
            </Typography>
        </Box>
      </Box>

      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={600}>Public Profile</Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Display Name"
              name="display_name"
              value={userSettings.display_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Program"
              name="program"
              value={userSettings.program}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Academic Term"
              name="term"
              value={userSettings.term}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Short Bio"
              name="bio"
              multiline
              rows={3}
              value={userSettings.bio}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={600}>Privacy</Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <Stack>
              <FormControlLabel
                control={
                  <Switch
                    checked={userSettings.private}
                    onChange={handleSwitchChange}
                    name="private"
                  />
                }
                label="Private Account"
              />
              <Typography variant="caption" color="text.secondary" sx={{ pl: 4 }}>
                If enabled, other users won't be able to see your profile details.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack>
              <FormControlLabel
                control={
                  <Switch
                    checked={userSettings.searchable}
                    onChange={handleSwitchChange}
                    name="searchable"
                  />
                }
                label="Appear in Search"
              />
              <Typography variant="caption" color="text.secondary" sx={{ pl: 4 }}>
                If disabled, you will not appear in user search results.
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sx={{ mt: 4, textAlign: 'right' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleAllSubmit}
            >
              Save All Changes
            </Button>
          </Grid>
        </Grid>
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

export default Settings;
