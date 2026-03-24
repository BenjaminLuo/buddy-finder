import React from 'react';
import { Menu, MenuItem } from '@mui/material';

export function DropDownOptions(anchorEl, handleDropdownClose, handleAuth, authUser, dropdownClick) {
    return (
        <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}>
            <MenuItem data-testid={'auth'} onClick={handleAuth}>{authUser ? "Sign Out" : "Sign In"}</MenuItem>

            {/* Only render the 'Profile' and 'Settings' if the user is signed in */}
            {authUser ?
                <div>
                    <MenuItem data-testid={'profile'} onClick={() => dropdownClick("Profile")}>Profile</MenuItem>
                    <MenuItem data-testid={'settings'} onClick={() => dropdownClick("Settings")}>Settings</MenuItem>
                </div>
                : ""}

            <MenuItem data-testid={'contact'} onClick={() => dropdownClick("Contact")}>Contact</MenuItem>
            <MenuItem data-testid={'faq'} onClick={() => dropdownClick("FAQ")}>FAQ</MenuItem>
        </Menu>
    );
}
