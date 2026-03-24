import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const faqData = [
  {
    question: "What is BuddyFinder?",
    answer: "BuddyFinder is a platform designed to help students connect with peers for various activities, from studying and sports to social events and project collaborations."
  },
  {
    question: "How does the Matching feature work?",
    answer: "You can post an activity you want to do, specifying the location, time, and type of activity. The platform will then show you other users who have posted similar interests, allowing you to connect with them."
  },
  {
    question: "Is my personal information safe?",
    answer: "Yes, you have full control over your privacy. In the Settings page, you can choose to make your profile private or prevent it from appearing in search results."
  },
  {
    question: "Can I create and track my own goals?",
    answer: "Absolutely! The Statistics page allows you to add personal goals and mark them as complete, helping you stay motivated and track your progress over time."
  },
  {
    question: "How do I report an issue or contact support?",
    answer: "You can use the Contact page to send us a message directly. We appreciate your feedback and will get back to you as soon as possible."
  }
];

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <HelpOutlineIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }}/>
        <Typography variant="h2" gutterBottom color="primary.dark">
          Frequently Asked Questions
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Find answers to common questions about BuddyFinder.
        </Typography>
      </Box>

      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        {faqData.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index} `}
            onChange={handleChange(`panel${index} `)}
            elevation={0}
            sx={{ 
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:before': { display: 'none' }, // Remove default top border
                '&:first-of-type': { borderTop: '1px solid', borderColor: 'divider' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
              sx={{ py: 1.5 }}
            >
              <Typography variant="h6" fontWeight={600} sx={{ flexShrink: 0 }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
};

export default FAQ;
