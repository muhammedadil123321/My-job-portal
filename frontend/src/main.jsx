import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { JobProvider } from "./context/JobContext";
import { ProfileProvider } from "./context/ProfileContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <JobProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </JobProvider>
    </BrowserRouter>
  </StrictMode>,
)