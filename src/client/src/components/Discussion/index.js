import * as React from 'react';
import {
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Card,
  CardContent,
  Paper,
  Stack,
  Avatar,
  Chip,
  Tab,
  Tabs
} from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';

const Discussion = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [newsSearchTerm, setNewsSearchTerm] = React.useState('');
  const [authorTerm, setAuthorTerm] = React.useState('');
  const [addedNewsTerm, setAddedNewsTerm] = React.useState('');
  const [addedNameTerm, setAddedNameTerm] = React.useState('');
  const [forum, setForum] = React.useState('General');
  const [error, seterror] = React.useState(false);

  // LISTS FOR EACH SUB FORUM
  const [newsGeneralList, setNewsGeneralList] = React.useState([
    { title: 'I just went to the grocery store and bought cheese.', author: "Carla" },
    { title: 'Bob in IT just said I am playing my music too loud.', author: "Stacy" },
    { title: 'University will be closed next week Wednesday!!', author: "Beth" },
  ]);
  const [newsSocialList, setNewsSocialList] = React.useState([
    { title: 'I am down for some lunch tonight!', author: "Benjamin" },
    { title: 'Heard about free Iftar meals next Thursday?', author: "Anyka" },
  ]);
  const [newsPhysList, setNewsPhysList] = React.useState([
    { title: 'The Warriors have a game againsts Laurier this weekend.', author: "Henry" },
    { title: 'I can play some badminton this Friday after 4:00 PM.', author: "Sophie" },
  ]);

  const onApplyAddition = () => {
    if (!addedNewsTerm || !addedNameTerm || !forum) {
      seterror(true);
      return;
    }
    const q = { title: addedNewsTerm, author: addedNameTerm };
    if (forum === 'General') setNewsGeneralList(prev => [...prev, q]);
    else if (forum === 'Social Event') setNewsSocialList(prev => [...prev, q]);
    else if (forum === 'Physical Activity') setNewsPhysList(prev => [...prev, q]);
    
    setAddedNewsTerm('');
    setAddedNameTerm('');
    seterror(false);
  };

  const filterNews = (list) => {
    return list.filter(item => 
      item.title.toLowerCase().includes(newsSearchTerm.toLowerCase()) &&
      (authorTerm === '' || item.author.toLowerCase().includes(authorTerm.toLowerCase()))
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom color="primary.dark">
          Community News
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Share updates and join discussions across our specialized forums.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Post News Column */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                Post an Update
              </Typography>
              <Stack spacing={2.5}>
                <TextField 
                  fullWidth 
                  label="What's happening?" 
                  multiline 
                  rows={3}
                  value={addedNewsTerm}
                  onChange={(e) => setAddedNewsTerm(e.target.value)}
                  error={error && !addedNewsTerm}
                />
                <TextField 
                  fullWidth 
                  label="Your Name" 
                  value={addedNameTerm}
                  onChange={(e) => setAddedNameTerm(e.target.value)}
                  error={error && !addedNameTerm}
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Forum Category</FormLabel>
                  <RadioGroup value={forum} onChange={(e) => setForum(e.target.value)}>
                    <FormControlLabel value="General" control={<Radio size="small"/>} label="General" />
                    <FormControlLabel value="Physical Activity" control={<Radio size="small"/>} label="Physical" />
                    <FormControlLabel value="Social Event" control={<Radio size="small"/>} label="Social" />
                  </RadioGroup>
                </FormControl>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<SendIcon />}
                  onClick={onApplyAddition}
                >
                  Post to Feed
                </Button>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Filter Feed
              </Typography>
              <Stack spacing={2}>
                <TextField 
                  fullWidth 
                  size="small"
                  placeholder="Search by keywords..." 
                  InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
                  onChange={(e) => setNewsSearchTerm(e.target.value)}
                />
                <TextField 
                  fullWidth 
                  size="small"
                  placeholder="Filter by author..." 
                  onChange={(e) => setAuthorTerm(e.target.value)}
                />
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        {/* Discussion Feed Column */}
        <Grid item xs={12} md={8}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} aria-label="discussion tabs">
              <Tab label="General" icon={<ForumIcon />} iconPosition="start" />
              <Tab label="Social" />
              <Tab label="Physical" />
            </Tabs>
          </Box>

          <Stack spacing={2}>
            {tabValue === 0 && filterNews(newsGeneralList).map((item, i) => <DiscussionCard key={i} item={item} category="General" />)}
            {tabValue === 1 && filterNews(newsSocialList).map((item, i) => <DiscussionCard key={i} item={item} category="Social" />)}
            {tabValue === 2 && filterNews(newsPhysList).map((item, i) => <DiscussionCard key={i} item={item} category="Physical" />)}
            
            {(tabValue === 0 ? newsGeneralList : tabValue === 1 ? newsSocialList : newsPhysList).length === 0 && (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    No posts in this category yet.
                </Typography>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

const DiscussionCard = ({ item, category }) => (
  <Card variant="outlined" sx={{ borderRadius: 3, '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(99, 102, 241, 0.02)' } }}>
    <CardContent>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40 }}>
          <PersonIcon />
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={700}>
              {item.author}
            </Typography>
            <Chip label={category} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
          </Stack>
          <Typography variant="body1" color="text.primary">
            {item.title}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button size="small" color="inherit" sx={{ opacity: 0.6 }}>Reply</Button>
            <Button size="small" color="inherit" sx={{ opacity: 0.6 }}>Share</Button>
          </Stack>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default Discussion;
