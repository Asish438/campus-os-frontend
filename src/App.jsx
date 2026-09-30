import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CampusProvider } from './context/CampusContext';
import AppRoutes from './routes/AppRoutes';

import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CampusProvider>
            <AppRoutes />
          </CampusProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
