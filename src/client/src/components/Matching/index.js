import React, { useContext, useState } from 'react';
import { AuthContext } from '../Authentication/AuthDetails';
import {
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Chip,
  Avatar,
  Stack,
  Divider,
  Fade
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const serverURL = "";

const Matching = () => {
  const { authUser } = useContext(AuthContext);
  const userID = authUser?.uid;

  const [place, setPlace] = useState('');
  const [activity, setActivity] = useState('');
  const [time, setTime] = useState('');
  const [searchResultsList, setSearchResultsList] = useState([]);

  const activities = [
    'Basketball', 'Gym', 'Soccer', 'Swimming', 'Badminton', 'Study', 'Lunch', 'Movie'
  ];

  const locations = [
    'PAC', 'CIF', 'SLC', 'DC Library', 'DP Library', 'MC', 'UWP', 'Lester'
  ];

  const callApiAddInterest = async () => {
    const url = serverURL + "/api/addInterest";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ place, activity, time, userID })
    });
    return await response.json();
  };

  const callApiSearchActivity = async () => {
    const url = serverURL + "/api/searchActivity";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ place, activity, time })
    });
    return await response.json();
  };

  const handleApplyChanges = () => {
    if (!place || !activity || !time) return;
    callApiAddInterest().then(res => {
        console.log("Interest added:", res);
        handleSearch();
    });
  };

  const handleSearch = () => {
    callApiSearchActivity().then(res => {
      setSearchResultsList(Array.isArray(res.express) ? res.express : []);
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom color="primary.dark">
          Buddy Matching
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Find someone to join you for your next activity. Fill in your details below to see who matches your interests.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Input Panel */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
              What's the plan?
            </Typography>
            
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                  value={place}
                  label="Location"
                  onChange={(e) => setPlace(e.target.value)}
                >
                  {locations.map(loc => <MenuItem key={loc} value={loc}>{loc}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Activity</InputLabel>
                <Select
                  value={activity}
                  label="Activity"
                  onChange={(e) => setActivity(e.target.value)}
                >
                  {activities.map(act => <MenuItem key={act} value={act}>{act}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="When? (e.g. Friday 4pm)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Friday 4pm"
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<AddIcon />}
                onClick={handleApplyChanges}
                sx={{ py: 1.5 }}
              >
                Post Activity
              </Button>

              <Button
                variant="outlined"
                fullWidth
                size="large"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{ py: 1.5 }}
              >
                Just Search
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Results Panel */}
        <Grid item xs={12} lg={8}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
            Available Buddies 
            <Chip 
              label={searchResultsList.length} 
              size="small" 
              color="primary" 
              sx={{ fontWeight: 700 }} 
            />
          </Typography>

          <Grid container spacing={3}>
            {searchResultsList.length > 0 ? (
              searchResultsList.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Fade in timeout={300 * (index % 5)}>
                    <Card sx={{ 
                      height: '100%', 
                      transition: '0.3s', 
                      '&:hover': { transform: 'scale(1.02)', borderColor: 'primary.light' } 
                    }}>
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Avatar sx={{ bgcolor: 'secondary.light' }}>
                            {item.display_name?.[0] || 'U'}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
                              {item.display_name || 'Anonymous User'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Match found for you
                            </Typography>
                          </Box>
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Stack spacing={1.5}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SportsBasketballIcon fontSize="small" color="action" />
                            <Typography variant="body2" fontWeight={600}>{item.action}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOnIcon fontSize="small" color="action" />
                            <Typography variant="body2">{item.location}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="primary.main">{item.time}</Typography>
                          </Box>
                        </Stack>
                        
                        <Button 
                          variant="contained" 
                          color="secondary" 
                          fullWidth 
                          size="small"
                          sx={{ mt: 3, borderRadius: 2 }}
                        >
                          Send Message
                        </Button>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ 
                  py: 10, 
                  textAlign: 'center', 
                  bgcolor: 'grey.50', 
                  borderRadius: 4,
                  border: '2px dashed',
                  borderColor: 'divider'
                }}>
                  <Typography variant="h6" color="text.secondary">
                    No buddies found for these criteria.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try searching for different locations or activities!
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Matching;
