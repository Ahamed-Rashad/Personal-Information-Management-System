import React, { useState }from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForms from './components/AuthForms';
import Dashboard from './components/Dashboard';
import RecordForms from './components/RecordForms';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <div>
      <h1 style={{textAlign:"center"}}>Personal Information Management System</h1>
      <Router>
      <Routes>
        <Route
          path="/"
          element={<AuthForms setIsAuthenticated={setIsAuthenticated} />}
        />
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/records" element={<RecordForms />} />
          </>
        ) : null}
      </Routes>
      </Router>
    </div>
  );
};

export default App;
