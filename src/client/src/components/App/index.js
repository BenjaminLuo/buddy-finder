import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from '../Navigation/PrivateRoute.js';
import Appbar from '../Appbar';
import { theme } from './theme';
import AuthDetails from '../Authentication/AuthDetails';

const App = () => {
  console.log('--- APP COMPONENT RENDERING ---');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthDetails>
        <Router>
          <Appbar />
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </AuthDetails>
    </ThemeProvider>
  );
}

export default App;
