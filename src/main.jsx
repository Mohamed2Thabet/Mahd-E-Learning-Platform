import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/global.css';
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos'; // Import AOS
import { ThemeProvider } from './context/ThemeContext'; 

// Initialize AOS
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider> 
      <App />
    </ThemeProvider>
  </StrictMode>
);
