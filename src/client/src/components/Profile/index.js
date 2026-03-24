import React, { useEffect, useContext, useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Divider,
  Chip,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import GetFetch from '../common';
import { AuthContext } from '../Authentication/AuthDetails';

const Profile = ({ userID: propUserID }) => {
  const { authUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const targetUserID = propUserID || authUser?.uid;

  useEffect(() => {
    if (targetUserID) {
      GetFetch('getUserSettings', { userID: targetUserID })
        .then(userData => {
            if (userData && userData.length > 0) {
                setUser(userData[0])
            } else {
                // Fallback for non-existent user
                setUser({
                    display_name: 'User Not Found',
                    bio: 'This user profile could not be retrieved.',
                    interests: [],
                    posts: [],
                    comments: []
                });
            }
        })
    } else {
        setUser({
            display_name: 'Anonymous',
            bio: 'Please sign in to view your profile.',
            interests: [],
            posts: [],
            comments: []
        });
    }
  }, [targetUserID]);

  if (!user) {
    return <Container sx={{ py: 6, textAlign: 'center' }}><Typography>Loading profile...</Typography></Container>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        {/* Left Container: User Account Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: 4, position: 'sticky', top: 100 }}>
            <Stack alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '3rem',
                  bgcolor: 'primary.main',
                  border: '4px solid',
                  borderColor: 'background.paper',
                  boxShadow: 3
                }}
              >
                {user.display_name?.[0]?.toUpperCase() || '?'}
              </Avatar>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={700}>
                  {user.display_name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Member since 2024
                </Typography>
              </Box>
              <Divider sx={{ width: '100%', my: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', minHeight: '40px' }}>
                {user.bio || 'This user has not set a bio yet.'}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                disabled={!authUser || authUser.uid !== user.user_id}
              >
                Edit Profile
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Right Container: User Activity */}
        <Grid item xs={12} md={8}>
          <Stack spacing={4}>
            <ProfileCard title="Interests" icon={<FavoriteIcon />}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {(user.interests && user.interests.length > 0) ? 
                    user.interests.map((interest, i) => <Chip key={i} label={interest} />) :
                    <Typography variant="body2" color="text.secondary">No interests listed.</Typography>
                }
              </Stack>
            </ProfileCard>

            <ProfileCard title="Recent Posts" icon={<PostAddIcon />}>
              {(user.posts && user.posts.length > 0) ?
                user.posts.map((post, i) => (
                  <Box key={i} sx={{ '&:not(:last-child)': { mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' } }}>
                    <Typography variant="body1">{post}</Typography>
                  </Box>
                )) :
                <Typography variant="body2" color="text.secondary">No posts found.</Typography>
              }
            </ProfileCard>

            <ProfileCard title="Recent Comments" icon={<CommentIcon />}>
              {(user.comments && user.comments.length > 0) ?
                user.comments.map((comment, i) => (
                  <Box key={i} sx={{ '&:not(:last-child)': { mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' } }}>
                    <Typography variant="body1">"{comment}"</Typography>
                  </Box>
                )) :
                <Typography variant="body2" color="text.secondary">No comments found.</Typography>
              }
            </ProfileCard>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

const ProfileCard = ({ title, icon, children }) => (
  <Paper sx={{ p: 3, borderRadius: 4 }}>
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
      {icon}
      <Typography variant="h6" fontWeight={600}>{title}</Typography>
    </Stack>
    {children}
  </Paper>
);

export default Profile;
