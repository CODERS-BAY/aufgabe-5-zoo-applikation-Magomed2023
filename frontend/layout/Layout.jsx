import React from 'react';
import { Container, Box, Typography, useTheme } from '@mui/material';
import {green, grey} from "@mui/material/colors";
//import backgroundImage from '../src/assets/TigerBackground.jpg';

const Header = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                //backgroundColor: theme.palette.primary.main,
                //color: theme.palette.primary.contrastText,
                //padding: '1rem',
                //textAlign: 'center',
                //boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
            }}
        >
            {/*<Typography variant="h4" sx={{ fontWeight: 600 }}>*/}
            {/*    Zoo-Logo*/}
            {/*</Typography>*/}
        </Box>
    );
};

const Footer = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                //backgroundColor: 'greenyellow',
                //color: theme.palette.primary.contrastText,
                //padding: '1rem',
                //textAlign: 'center',
                //boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Typography>© 2023 ZooAPI</Typography>
        </Box>
    );
};

const Layout = ({ children }) => {
    const theme = useTheme();

    return (
        <Container
            maxWidth={false}
            sx={{
                width: '100vw',
                height: '100vh',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.default, 
                
                //backgroundSize: 'cover',
            }}
        >
            <Header />
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    //background: theme.palette.background.default,
                    opacity: 0.9,
                    overflow: 'auto', // Fügt einen Scrollbalken hinzu, wenn der Inhalt größer als der verfügbare Platz ist
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        maxWidth: '80%', // Begrenzt die Breite des Inhaltsbereichs
                    }}
                >
                    {children}
                </Box>
            </Box>
            
        </Container>
    );
};

export default Layout;