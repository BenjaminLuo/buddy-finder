import React, { useContext, useCallback } from 'react';
import { AuthContext } from '../Authentication/AuthDetails';
import {
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Card,
  CardContent,
  Grid,
  Container,
  Paper,
  Stack,
  Avatar,
  Divider,
  Chip,
  InputLabel
} from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SendIcon from '@mui/icons-material/Send';
import PublicIcon from '@mui/icons-material/Public';

const serverURL = "";

export default function QA() {
  const [usersList, setUsersList] = React.useState([]);
  const { authUser } = useContext(AuthContext);
  const userID = authUser?.uid;

  const [value, setValue] = React.useState('');
  const [post, setPost] = React.useState('');
  const [ran, setRan] = React.useState('');
  const [postList, setPostList] = React.useState([]);

  const callApiUserNames = useCallback(async () => {
    const url = serverURL + "/api/getUsersArray";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const arrayBody = await response.json();
    return arrayBody;
  }, []);

  const loadUsers = useCallback(() => {
    callApiUserNames().then(res => {
        let list = [];
        if (res && res.express) {
            try {
                list = typeof res.express === 'string' ? JSON.parse(res.express) : res.express;
            } catch (e) {
                list = res.express;
            }
        }
        setUsersList(Array.isArray(list) ? list : []);
    });
  }, [callApiUserNames]);

  React.useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const callApiAddChat = async () => {
    const url = serverURL + "/api/addChat";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post, ran, userID })
    });
    return await response.json();
  };

  const onApplyPost = () => {
    if (!post || !ran) return;
    const q = { post, ran, userID };
    setPostList(prev => [q, ...prev]);
    callApiAddChat().then(() => {
        setRan('');
        setValue('');
        setPost('');
    });
  };

  const chatOptions = ["Yi Fei", "Suiyu", "A struggling student", "Ephei Tea", "Benjamin Luo"];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom color="primary.dark">
          Global Forum
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Ask questions, share advice, or just say hello to the community.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Post Question Form */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 4, borderRadius: 4, position: 'sticky', top: 100 }}>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <QuestionAnswerIcon />
                </Avatar>
                <Typography variant="h5" fontWeight={700}>Ask the Community</Typography>
              </Box>
              
              <FormControl fullWidth>
                <InputLabel>Who are you addressing?</InputLabel>
                <Select
                  value={value}
                  label="Who are you addressing?"
                  onChange={(e) => {
                    setValue(e.target.value);
                    setPost(e.target.value);
                  }}
                >
                  <MenuItem value=""><em>General</em></MenuItem>
                  {chatOptions.map((ch, i) => <MenuItem key={i} value={ch}>{ch}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Your Message or Question"
                multiline
                rows={4}
                value={ran}
                onChange={(e) => setRan(e.target.value)}
                placeholder="Type something..."
              />

              <Button
                variant="contained"
                size="large"
                fullWidth
                endIcon={<SendIcon />}
                onClick={onApplyPost}
                sx={{ py: 1.5 }}
              >
                Post to Forum
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Forum Feed */}
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <PublicIcon color="primary" />
              <Typography variant="h5" fontWeight={700}>Recent Activity</Typography>
            </Box>

            {/* Local Posts */}
            {postList.map((item, index) => (
              <ForumCard key={`local-${index} `} item={item} isLocal />
            ))}

            {/* Global Posts */}
            {usersList.map((item, index) => (
              <ForumCard key={`global-${index}`} item={{
                post: item.display_name,
                ran: item.content
              }} />
            ))}

            {postList.length === 0 && usersList.length === 0 && (
              <Box sx={{ py: 10, textAlign: 'center', bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <Typography color="text.secondary">No forum posts yet. Be the first!</Typography>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

const ForumCard = ({ item, isLocal }) => (
  <Card variant="outlined" sx={{ borderRadius: 3, transition: '0.2s', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' } }}>
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar sx={{ bgcolor: isLocal ? 'secondary.light' : 'primary.light', width: 32, height: 32, fontSize: '0.8rem' }}>
          {item.post?.[0]?.toUpperCase() || 'A'}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
            {item.post || 'Community'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {isLocal ? 'Just now' : 'Recent post'}
          </Typography>
        </Box>
        {isLocal && <Chip label="Your Post" size="small" color="secondary" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', ml: 'auto' }} />}
      </Stack>
      <Typography variant="body1" sx={{ color: 'text.primary', pl: 6 }}>
        {item.ran}
      </Typography>
      <Divider sx={{ my: 2, ml: 6 }} />
      <Stack direction="row" spacing={1} sx={{ pl: 6 }}>
        <Button size="small" color="inherit" sx={{ fontSize: '0.75rem', opacity: 0.7 }}>Helpful</Button>
        <Button size="small" color="inherit" sx={{ fontSize: '0.75rem', opacity: 0.7 }}>Reply</Button>
      </Stack>
    </CardContent>
  </Card>
);
