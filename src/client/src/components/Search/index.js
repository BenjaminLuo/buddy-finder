import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Authentication/AuthDetails';
import GetFetch from '../common';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
  Stack,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BlockIcon from '@mui/icons-material/Block';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import GroupIcon from '@mui/icons-material/Group';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';

const Search = () => {
  const { authUser } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [query, setQuery] = useState("");

  const loadData = () => {
    if (!authUser?.uid) return;
    GetFetch('getUserList').then(data => setAccounts(Array.isArray(data) ? data : []));
    GetFetch('getFriendList', { userID: authUser.uid }).then(data => setFriends(Array.isArray(data) ? data : []));
    GetFetch('getBlockList', { userID: authUser.uid }).then(data => setBlocked(Array.isArray(data) ? data : []));
  };

  useEffect(loadData, [authUser]);

  const updateUserList = (listType, addresseeID, action) => {
    GetFetch(action === 'add' ? 'addUser' : 'removeUser', { 
      action: listType, 
      userID: authUser.uid, 
      addressee: addresseeID 
    }).then(loadData);
  };
  
  const filteredUsers = accounts.filter(user =>
    user.display_name?.toLowerCase().includes(query.toLowerCase()) &&
    user.user_id !== authUser?.uid
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom color="primary.dark">
          Find Users
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Search for other users on the platform and manage your connections.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Friends/Blocked Lists */}
        <Grid item xs={12} md={4}>
          <Stack spacing={4}>
            <ListCard 
              title="Friends" 
              icon={<GroupIcon />} 
              users={accounts.filter(u => friends.includes(u.user_id))}
              actionIcon={<PersonRemoveIcon />}
              onAction={(id) => updateUserList('friend', id, 'remove')}
              emptyText="Your friends list is empty."
            />
            <ListCard 
              title="Blocked Users" 
              icon={<NoAccountsIcon />} 
              users={accounts.filter(u => blocked.includes(u.user_id))}
              actionIcon={<PersonAddIcon />}
              onAction={(id) => updateUserList('block', id, 'remove')}
              emptyText="You haven't blocked any users."
            />
          </Stack>
        </Grid>

        {/* User Search */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: 4 }} data-testid="search-results">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by display name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              sx={{ mb: 4 }}
            />
            <Stack spacing={2}>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <UserCard 
                    key={user.user_id} 
                    user={user} 
                    isFriend={friends.includes(user.user_id)}
                    isBlocked={blocked.includes(user.user_id)}
                    onUpdate={updateUserList}
                  />
                ))
              ) : (
                <Box sx={{ py: 6, textAlign: 'center' }}>
                  <Typography color="text.secondary">No users found matching your search.</Typography>
                </Box>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const UserCard = ({ user, isFriend, isBlocked, onUpdate }) => (
  <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
    <Avatar sx={{ bgcolor: 'primary.light' }}>{user.display_name?.[0]}</Avatar>
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6">{user.display_name}</Typography>
      <Typography variant="body2" color="text.secondary">{user.bio || 'No bio available'}</Typography>
    </Box>
    {!isFriend && !isBlocked && (
      <>
        <Button size="small" startIcon={<PersonAddIcon />} onClick={() => onUpdate('friend', user.user_id, 'add')}>
          Add
        </Button>
        <Button size="small" startIcon={<BlockIcon />} color="error" onClick={() => onUpdate('block', user.user_id, 'add')}>
          Block
        </Button>
      </>
    )}
    {isFriend && <Chip label="Friend" color="success" size="small" />}
    {isBlocked && <Chip label="Blocked" color="error" size="small" />}
  </Paper>
);

const ListCard = ({ title, icon, users, actionIcon, onAction, emptyText }) => (
  <Paper sx={{ p: 3, borderRadius: 4 }}>
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
      {icon}
      <Typography variant="h6" fontWeight={600}>{title}</Typography>
    </Stack>
    <Divider />
    <List>
      {users.length > 0 ? (
        users.map(user => (
          <ListItem
            key={user.user_id}
            secondaryAction={<IconButton edge="end" onClick={() => onAction(user.user_id)}>{actionIcon}</IconButton>}
            sx={{ px: 0 }}
          >
            <ListItemAvatar>
              <Avatar>{user.display_name?.[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.display_name} />
          </ListItem>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', pt: 2 }}>
          {emptyText}
        </Typography>
      )}
    </List>
  </Paper>
);

export default Search;
