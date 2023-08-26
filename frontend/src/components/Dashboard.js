import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    Button,
} from "@mui/material";
import {Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await axios.get("/api/records");
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    const handleDelete = async (recordId) => {
        try {
            await axios.delete(`/api/records/${recordId}`);
            fetchRecords();
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4">Dashboard</Typography>
            <Button
        variant="contained"
        startIcon={<Add />}
        component={Link}
        to="/records"
      >
        Add User
      </Button>
            <List>
                {records.map((record) => (
                    <React.Fragment key={record._id}>
                        <ListItem>
                            <ListItemText primary={`Name: ${record.name}`} />
                            <ListItemText primary={`Age: ${record.age}`} />
                            <ListItemText primary={`Email: ${record.email}`} />
                            <ListItemText primary={`Phone Number: ${record.phoneNumber}`} />
                            <Link
                                to={`/records/edit/${record._id}`}
                                style={{ textDecoration: "none" }}
                            >
                                <IconButton color="primary">
                                    <Edit />
                                </IconButton>
                            </Link>
                            <IconButton
                                color="secondary"
                                onClick={() => handleDelete(record._id)}
                            >
                                <Delete />
                            </IconButton>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Container>
    );
};

export default Dashboard;
