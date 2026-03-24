import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Authentication/AuthDetails';
import {
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Button
} from '@mui/material';
import GetFetch from '../common';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Statistics = () => {
  const { authUser } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (authUser?.uid) {
      GetFetch('getUserGoals', { userID: authUser.uid })
        .then(data => setGoals(Array.isArray(data) ? data : []))
        .catch(console.error);
    }
  }, [authUser]);

  const handleUpdateGoal = (goalID) => {
    GetFetch('updateUserGoals', { goalID })
      .then(() => {
        setGoals(prev => prev.map(g => g.id === goalID ? { ...g, completed: 1 } : g));
      })
      .catch(console.error);
  };
  
  const completedGoals = goals.filter(g => g.completed);
  const incompleteGoals = goals.filter(g => !g.completed);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom color="primary.dark">
          Your Progress
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Review your achievements and track your ongoing goals.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {/* Usage Statistics Card */}
        <Grid item xs={12} md={6} lg={4}>
          <UsageStatisticsCard completedCount={completedGoals.length} totalCount={goals.length} />
        </Grid>
        
        {/* Goals Grid */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={4}>
            {/* Incomplete Goals */}
            <Grid item xs={12} md={6}>
              <GoalsList 
                title="Active Goals" 
                goals={incompleteGoals} 
                onUpdate={handleUpdateGoal}
                isCompleted={false}
              />
            </Grid>

            {/* Completed Goals */}
            <Grid item xs={12} md={6}>
              <GoalsList 
                title="Completed" 
                goals={completedGoals} 
                isCompleted={true}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const UsageStatisticsCard = ({ completedCount, totalCount }) => (
  <Paper sx={{ p: 4, borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
      <BarChartIcon color="primary" />
      <Typography variant="h6" fontWeight={600}>Usage Statistics</Typography>
    </Box>
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Typography variant="h1" color="primary" fontWeight={800} sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        }}>
            {completedCount} / {totalCount}
        </Typography>
        <Typography variant="h6" color="text.secondary">
            Goals Completed
        </Typography>
    </Box>
  </Paper>
);

const GoalsList = ({ title, goals, onUpdate, isCompleted }) => (
  <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6" fontWeight={600}>{title}</Typography>
      <Chip 
        label={goals.length} 
        size="small" 
        color={isCompleted ? "success" : "default"}
        sx={{ fontWeight: 600 }} 
      />
    </Box>
    <Divider sx={{ mb: 2 }} />
    <List disablePadding>
      {goals.length > 0 ? (
        goals.map(goal => (
          <ListItem 
            key={goal.id} 
            sx={{ px: 0, py: 1.5, '&:not(:last-child)': { borderBottom: '1px solid', borderColor: 'divider' } }}
            secondaryAction={!isCompleted && (
              <Button size="small" variant="outlined" onClick={() => onUpdate(goal.id)}>
                Complete
              </Button>
            )}
          >
            <ListItemIcon sx={{ minWidth: 40, color: isCompleted ? 'success.main' : 'grey.500' }}>
              {isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </ListItemIcon>
            <ListItemText 
              primary={goal.goal} 
              sx={{ textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? 'text.secondary' : 'text.primary' }} 
            />
          </ListItem>
        ))
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <EmojiEventsIcon sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
          <Typography color="text.secondary">
            {isCompleted ? "No goals completed yet." : "All goals achieved!"}
          </Typography>
        </Box>
      )}
    </List>
  </Paper>
);

export default Statistics;
