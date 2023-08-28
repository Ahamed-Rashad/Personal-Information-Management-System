import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    IconButton,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import RecordForms from "./RecordForms";


const Dashboard = () => {
    const [records, setRecords] = useState([]);
    const [showRecordForm, setShowRecordForm] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    const handleRecordCreated = () => {
        fetchRecords(); // Fetch records to update the list
    };

    const handleDelete = async (recordId) => {
        try {
            await axios.delete(`/api/records/delete/${recordId}`);
            fetchRecords();
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    const handleEdit = (record) => {
        setSelectedRecord(record);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedRecord(null);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/records/update/${selectedRecord._id}`, selectedRecord);
            fetchRecords();
            handleCloseDialog();
        } catch (error) {
            console.error("Error updating record:", error);
        }
    };

    

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            {showRecordForm ? (
                <RecordForms
                    onRecordCreated={handleRecordCreated}
                    onCancel={() => setShowRecordForm(false)}
                    selectedRecord={selectedRecord}
                    onUpdate={() => {
                        setShowRecordForm(false);
                        fetchRecords();
                    }}
                />
            ) : (
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setShowRecordForm(true)}
                >
                    Add User
                </Button>
            )}

            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record._id}>
                                <TableCell>{record.name}</TableCell>
                                <TableCell>{record.age}</TableCell>
                                <TableCell>{record.email}</TableCell>
                                <TableCell>{record.phoneNumber}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEdit(record)}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleDelete(record._id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm">
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    {selectedRecord && (
                        <form>
                            <TextField
                                label="Name"
                                value={selectedRecord.name}
                                onChange={(e) =>
                                    setSelectedRecord({ ...selectedRecord, name: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Age"
                                value={selectedRecord.age}
                                onChange={(e) =>
                                    setSelectedRecord({ ...selectedRecord, age: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                value={selectedRecord.email}
                                onChange={(e) =>
                                    setSelectedRecord({ ...selectedRecord, email: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Phone Number"
                                value={selectedRecord.phoneNumber}
                                onChange={(e) =>
                                    setSelectedRecord({
                                        ...selectedRecord,
                                        phoneNumber: e.target.value,
                                    })
                                }
                                fullWidth
                                margin="normal"
                            />
                        </form>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained" color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Dashboard;
