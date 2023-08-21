import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Layout from '../layout/Layout';
import ServiceList from '../src/services/ServiceList';
import zooAPIcb from '../../img/zooAPIcb.png';

const HomePage = () => {
    return (
        <Layout>
            <Box sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
                
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '720px' }}>
                    <a href="http://localhost:5173/">
                        <img src={zooAPIcb} alt="Zoo" style={{ display: 'block', margin: '-400px auto 0' }} /> 
                    </a>
            </Box>
        </Layout>
    );
};

export default HomePage;
