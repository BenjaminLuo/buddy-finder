import React from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Modal,
    Typography,
    Box,
    Fade
} from '@mui/material';

const UsageStatistics = ({ goals, onUpdate, theme }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        whiteSpace: 'pre-line'
    };

    return (
        <React.Fragment>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Goal Completion
            </Typography>
            <Button
                onClick={handleOpen}
                variant="contained"
                sx={{ float: 'right', mb: 2 }}
            >
                Add Goal
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" component="h2">
                            Add a New Goal
                        </Typography>
                        {/* Add form here to add a new goal */}
                    </Box>
                </Fade>
            </Modal>
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: 'primary.main' }}>
                        <TableRow>
                            <TableCell>Goal</TableCell>
                            <TableCell align="right">Completed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {goals.map((goal) => (
                            <TableRow key={goal.id}>
                                <TableCell component="th" scope="row">
                                    {goal.goal}
                                </TableCell>
                                <TableCell align="right">
                                    {goal.completed ? 'Yes' : (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => onUpdate(goal.id)}
                                        >
                                            Mark as Completed
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default UsageStatistics;
