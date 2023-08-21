import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Box, Paper } from '@mui/material';
import TicketForm from '../src/components/TicketForm';
import TicketTable from '../src/components/TicketTable';
import { fetchTickets, buyTicket, fetchTicketsByDate } from '../src/services/api.js';
import Layout from "../layout/Layout";
import zooEingang from '../../img/zooEingang.jpeg';

function KassiererPage() {
    const [tickets, setTickets] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 16));
    const [selectedTicketType, setSelectedTicketType] = useState('');
    const ticketPrices = {
        '1': 5.0,
        '2': 10.0,
        '3': 7,
    };

    useEffect(() => {
        fetchTickets().then((data) => setTickets(data));
    }, []);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTicketTypeChange = (event) => {
        setSelectedTicketType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        buyTicket(selectedTicketType, ticketPrices, selectedDate).then((success) => {
            if (success) {
                fetchTickets().then((data) => setTickets(data));
            }
        });
    };

    const totalTickets = tickets.length;
    const totalPrice = tickets.reduce((sum, ticket) => sum + ticket.preis, 0);

    return (
        <Container>
            <Layout>
                <Paper elevation={3} sx={{ padding: 20, marginBottom: 20, backgroundColor: '#F5F5F5', position: 'relative' }}>
                    <a href="http://localhost:5173/">
                        <img src={zooEingang} alt="Zoo" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    </a>
                </Paper>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TicketForm
                            selectedDate={selectedDate}
                            handleDateChange={handleDateChange}
                            selectedTicketType={selectedTicketType}
                            handleTicketTypeChange={handleTicketTypeChange}
                            handleSubmit={handleSubmit}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            onClick={() => fetchTicketsByDate(selectedDate).then((data) => setTickets(data))}
                        >
                            Tickets nach Datum abrufen
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TicketTable tickets={tickets} />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Gesamtanzahl der verkauften Tickets: {totalTickets}
                    </Typography>
                    <Typography variant="h6">
                        Gesamtsumme: {totalPrice.toFixed(2)} €
                    </Typography>
                </Box>
            </Layout>
        </Container>
    );
}

export default KassiererPage;
