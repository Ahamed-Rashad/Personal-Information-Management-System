import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000"

const RecordForms = ({ onRecordCreated }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleCreateRecord = async () => {
      try {
        const response = await axios.post('/api/records/post', {
          name,
          age,
          email,
          phoneNumber,
        });
        if (response.status === 201) {
          setSuccessMessage('Record created successfully');
          setErrorMessage('');
          onRecordCreated(); 
        } else {
          
        }
      } catch (error) {
        setSuccessMessage('');
        
      }
    };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Create Record</Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleCreateRecord}
      >
        Create Record
      </Button>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </Container>
  );
};

export default RecordForms;
