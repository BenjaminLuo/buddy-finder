import React, { useContext, useState } from 'react';
import { AuthContext } from '../Authentication/AuthDetails';
import { Rating, Typography, FormControl, FormLabel, FormControlLabel, FormGroup, RadioGroup, Radio, Button, Box, Select, MenuItem, Slider, Checkbox, Grid, Container, Paper, Stack, Chip } from '@mui/material';

const serverURL = "";

function valuetext(value) {
  return `${value}°C`;
}

export default function Similar() {
  const { authUser } = useContext(AuthContext);
  const userID = authUser?.uid;
  const [resultsList, setResultsList] = useState([]);

  const loadResults = (finalVal) => {
    callApiUsers(finalVal).then(res => {
      setResultsList(Array.isArray(res.express) ? res.express : []);
    });
  };

  const callApiUsers = async (finalVal) => {
    const url = serverURL + "/api/searchPeople";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ final: finalVal })
    });
    const notArrayBody = await response.json();
    if (response.status !== 200) throw Error(notArrayBody.message);
    return notArrayBody;
  };

  const addPeople = (finalVal) => {
    callApiAddPeople(finalVal).then(res => {
      // res.express contains the result of the insertion
    });
  };

  const callApiAddPeople = async (finalVal) => {
    const url = serverURL + "/api/addPeople";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ final: finalVal, userID: userID })
    });
    const responseSimilar = await response.json();
    if (response.status !== 200) throw Error(responseSimilar.message);
    return responseSimilar;
  };

  const [place, setPlace] = useState('');
  const [soft, setSoft] = useState('');
  const [play, setPlay] = useState('');
  const [numb, setNumb] = useState('');

  const acts = [
    { type: "Basketball", num: 1 },
    { type: "Gym", num: 2 },
    { type: "Soccer", num: 3 },
    { type: "Swimming", num: 4 }
  ];

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);

  const addUp = () => {
    const currentFur = checked ? 1 : 0;
    const sum = parseInt(place || 0) + (soft || 0) + (play || 0) + (numb || 0) + currentFur;
    const finalVal = sum % 2 === 0 ? 0 : 1;
    return finalVal;
  };

  const onApplySim = () => {
    const finalVal = addUp();
    addPeople(finalVal);
    loadResults(finalVal);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" gutterBottom color="primary.dark">
                Similarity Questionnaire
            </Typography>
            <Typography variant="h6" color="text.secondary">
                Answer a few questions to find like-minded people.
            </Typography>
        </Box>

        <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Stack spacing={4} alignItems="center">
                <QuestionCard title="Which do you prefer more?">
                    <RadioGroup row value={place} onChange={(e) => setPlace(e.target.value)}>
                        <FormControlLabel value="1" control={<Radio />} label="Outdoors" />
                        <FormControlLabel value="2" control={<Radio />} label="Indoors" />
                    </RadioGroup>
                </QuestionCard>

                <QuestionCard title="Which is your favourite activity?">
                    <FormControl sx={{ minWidth: 240 }}>
                        <Select value={value} onChange={(e) => { setValue(e.target.value); setPlay(e.target.value); }} open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            {acts.map((a) => <MenuItem key={a.num} value={a.num}>{a.type}</MenuItem>)}
                        </Select>
                    </FormControl>
                </QuestionCard>

                <QuestionCard title="How much do you like MSCI 342?">
                    <Rating value={parseInt(soft) || 0} onChange={(e, newVal) => setSoft(newVal)} />
                </QuestionCard>
                
                <QuestionCard title="Pick a number">
                    <Box sx={{ width: 300 }}>
                        <Slider defaultValue={2} getAriaValueText={valuetext} valueLabelDisplay="auto" step={1} marks min={1} max={5} onChange={(e, newVal) => setNumb(newVal)} />
                    </Box>
                </QuestionCard>

                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label="Randomize further" />
                </FormGroup>

                <Button variant="contained" size="large" onClick={onApplySim} sx={{ mt: 3, px: 6 }}>
                    Find Similar People
                </Button>
            </Stack>
        </Paper>

        {resultsList.length > 0 && (
            <Paper sx={{ p: 4, mt: 4, borderRadius: 4 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Results:</Typography>
                <Grid container spacing={2}>
                    {resultsList.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                           <Chip label={item.display_name} variant="outlined" />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        )}
    </Container>
  );
}

const QuestionCard = ({ title, children }) => (
    <FormControl component="fieldset">
        <FormLabel component="legend" sx={{ typography: 'h6', mb: 2, textAlign: 'center', width: '100%' }}>{title}</FormLabel>
        {children}
    </FormControl>
);
