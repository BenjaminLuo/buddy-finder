import React from 'react';
import {
    Button,
    Menu
} from '@mui/material';

const DropDownButton = ({ name, options, onSelection }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (selection) => {
        setAnchorEl(null);
        onSelection(selection);
    };

    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleClick}
                sx={{ ml: 2, textTransform: 'none' }}
            >
                {name}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleClose(null)}
            >
                {options}
            </Menu>
        </React.Fragment>
    );
}

export default DropDownButton;
