import React, { useContext, useState } from 'react';
import { signOut, auth } from "../Auth/auth";
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { AuthContext } from '../Authentication/AuthDetails'
import { SignInModal } from './SignInModal';

const navItems = [
  { text: 'Matching', route: '/Matching' },
  { text: 'News', route: '/Discussion' },
  { text: 'Forum', route: '/QA' },
  { text: 'Calendar', route: '/Calendar' },
  { text: 'Statistics', route: '/Statistics' },
  { text: 'Search', route: '/Search' },
  { text: 'Similar', route: '/Similar' }
];

export default function NavBar() {
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openAuth, setOpenAuth] = useState(false);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleOpenAuth = () => setOpenAuth(true);
  const handleCloseAuth = () => setOpenAuth(false);

  const navigateTo = (route) => {
    handleCloseNavMenu();
    navigate(route);
  };

  const handleAuthAction = () => {
    handleCloseUserMenu();
    if (authUser) {
      signOut(auth).then(() => navigate("/")).catch(console.log);
    } else {
      handleOpenAuth();
    }
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo / Brand Name */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          onClick={() => navigate('/')}
          sx={{ 
            cursor: 'pointer', 
            fontWeight: 800, 
            fontSize: '1.5rem',
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: { xs: 'none', md: 'block' }
          }}
        >
          BuddyFinder
        </Typography>

        {/* Mobile Hamburger Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            <MenuItem onClick={() => navigateTo('/')}><Typography>Home</Typography></MenuItem>
            {navItems.map((item) => (
              <MenuItem key={item.text} onClick={() => navigateTo(item.route)}>
                <Typography>{item.text}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Typography
          variant="h6"
          noWrap
          component="div"
          onClick={() => navigate('/')}
          sx={{ 
            flexGrow: 1, 
            display: { xs: 'flex', md: 'none' },
            fontWeight: 800,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          BF
        </Typography>

        {/* Desktop Navigation Links */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.text}
              onClick={() => navigateTo(item.route)}
              sx={{ 
                color: 'text.primary', 
                opacity: 0.8,
                '&:hover': { opacity: 1, color: 'primary.main' },
                fontSize: '0.95rem'
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        {/* User Profile / Authentication Menu */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="User settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5, border: '1px solid', borderColor: 'divider' }}>
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  bgcolor: authUser ? 'primary.main' : 'grey.300',
                  fontSize: '0.9rem'
                }}
              >
                {authUser ? authUser.email[0].toUpperCase() : '?'}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {authUser ? [
              <MenuItem key="profile" onClick={() => { handleCloseUserMenu(); navigate('/Profile'); }}>
                <Typography>Profile</Typography>
              </MenuItem>,
              <MenuItem key="settings" onClick={() => { handleCloseUserMenu(); navigate('/Settings'); }}>
                <Typography>Settings</Typography>
              </MenuItem>
            ] : null}
            <MenuItem key="contact" onClick={() => { handleCloseUserMenu(); navigate('/Contact'); }}>
              <Typography>Contact</Typography>
            </MenuItem>
            <MenuItem key="faq" onClick={() => { handleCloseUserMenu(); navigate('/FAQ'); }}>
              <Typography>FAQ</Typography>
            </MenuItem>
            <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 1, pt: 1 }}>
                {authUser ? (
                <MenuItem key="logout" onClick={handleAuthAction} sx={{ color: 'error.main' }}>
                    <Typography>Sign Out</Typography>
                </MenuItem>
                ) : (
                <MenuItem key="login" onClick={handleAuthAction} sx={{ color: 'primary.main' }}>
                    <Typography fontWeight={600}>Sign In / Register</Typography>
                </MenuItem>
                )}
            </Box>
          </Menu>
        </Box>
      </Toolbar>

      <SignInModal open={openAuth} handleClose={handleCloseAuth} />
    </AppBar>
  );
}
