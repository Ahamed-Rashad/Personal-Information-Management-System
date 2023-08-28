import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { AccountCircle, Lock, Close } from '@mui/icons-material';
import axios from 'axios';
import Dashboard from './Dashboard';

axios.defaults.baseURL = "http://localhost:5000"

const AuthForms = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegisterOpen = () => {
    setOpenRegister(true);
  };

  const handleRegisterClose = () => {
    setOpenRegister(false);
  };

  const handleRegister = async () => {
    try {
      await axios.post('/api/auth/register', { username: registerUsername, password: registerPassword });
      setSuccessMessage('Registration successful');
      handleRegisterClose();
    } catch (error) {
      setErrorMessage('Registration failed');
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post('/api/auth/login', { username: loginUsername, password: loginPassword });
      setSuccessMessage('Login successful');
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
      setErrorMessage('Login failed');
    }
  };

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center" p={3}>
        {/* <Typography variant="h4">Login</Typography> */}
        {!loggedIn && (
          <>
            <TextField
              label="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              variant="outlined"
              size="small"
              //fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <AccountCircle />,
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              variant="outlined"
              size="small"
              // fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <Lock />,
              }}
              
            />
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
            <Link href="#" onClick={handleRegisterOpen}>
              Don't have an account?
            </Link>
          </>
        )}
      </Box>

      <Dialog open={openRegister} onClose={handleRegisterClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <IconButton aria-label="close" onClick={handleRegisterClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <Close />
          </IconButton>
          
          <TextField
            label="Username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <AccountCircle />,
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <Lock />,
            }}
          />
          <Button variant="contained" onClick={handleRegister}>Register</Button>
        </DialogContent>
      </Dialog>

      {loggedIn && <Dashboard />}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AuthForms;
