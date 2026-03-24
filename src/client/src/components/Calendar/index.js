import React, { useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Modal,
  TextField,
  Stack
} from '@mui/material';
import GetFetch from '../common';
import { AuthContext } from '../Authentication/AuthDetails';
import EventIcon from '@mui/icons-material/Event';

const Calendar = () => {
  const { authUser } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (authUser?.uid) {
      GetFetch('getUsersCalendar', { userID: authUser.uid })
        .then(data => {
          const formattedEvents = (Array.isArray(data) ? data : []).map(event => ({
            title: event.event,
            start: event.start,
            end: event.end,
            id: event.id
          }));
          setEvents(formattedEvents);
        });
    }
  }, [authUser]);

  const handleAddEvent = (newEvent) => {
    GetFetch('addCalendar', { ...newEvent, userID: authUser.uid })
      .then(() => {
        setEvents(prev => [...prev, { title: newEvent.eventName, start: newEvent.startTime, end: newEvent.endTime }]);
        setIsFormOpen(false);
      });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
            <Typography variant="h2" gutterBottom color="primary.dark">
                Your Calendar
            </Typography>
            <Typography variant="h6" color="text.secondary">
                Manage your schedule and track your activities.
            </Typography>
        </Box>
        <Button variant="contained" startIcon={<EventIcon />} onClick={() => setIsFormOpen(true)}>
          Add Event
        </Button>
      </Box>

      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, '.fc-toolbar-title': { fontSize: { xs: '1.2rem', md: '1.5rem' } } }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          height="auto"
          contentHeight="auto"
          aspectRatio={1.75}
        />
      </Paper>
      
      <AddEventForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddEvent}
      />
    </Container>
  );
};

const AddEventForm = ({ isOpen, onClose, onSubmit }) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = () => {
    if (eventName && startTime) {
      onSubmit({ eventName, startTime, endTime: endTime || startTime });
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 4,
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Add New Event</Typography>
        <Stack spacing={3}>
          <TextField
            label="Event Name"
            fullWidth
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <TextField
            label="Start Time"
            type="datetime-local"
            fullWidth
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Time (Optional)"
            type="datetime-local"
            fullWidth
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" size="large" onClick={handleSubmit}>
            Save Event
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default Calendar;
