import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function ServiceList() {
    const services = [
        { path: '/zoobesucher', label: 'Besucher' },
        { path: '/kassierer', label: 'Kassierer' },
        { path: '/tierpfleger', label: 'Tierpfleger' },
    ];

    return (
        <List sx={{ width: '100%', maxWidth: 1920, bgcolor: 'background.paper', textAlign: 'left', mb: 4 }}>
            {services.map((service) => (
                <ListItem key={service.path} component={Link} to={service.path}>
                    <ListItemText primary={service.label} />
                </ListItem>
            ))}
        </List>
    );
}

export default ServiceList;