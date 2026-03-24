import React from 'react';
import {
    Typography, Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import { useStyles } from './index';
import { theme } from '../App/theme'

// Function for each accordion component
export const FAQContent = ({ question, answer }) => {
    const classes = useStyles();

    return (
        <Accordion className={classes.accordion}>

            <AccordionSummary
                expandIcon={"▼"}
                style={{ paddingRight: '20px', paddingLeft: '40px', backgroundColor: theme.palette.primary.main }}>
                <Typography variant="h6">{question}</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Typography>{answer}</Typography>
            </AccordionDetails>

        </Accordion>
    );
};
