import React, {useState, useEffect, useCallback} from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    TextField,
    CircularProgress,
    IconButton
} from '@mui/material';
import {Box} from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import Layout from "../layout/Layout.jsx";

function ZoobesucherPage() {
    const [animals, setAnimals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [animalImages, setAnimalImages] = useState({});

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const fetchAnimals = useCallback(
        debounce((gattung = '') => {
            setLoading(true);
            const endpoint = gattung
                ? `http://localhost:5207/api/Zoobesucher/tiere/${gattung}`
                : 'http://localhost:5207/api/zoobesucher/tiere';
            fetch(endpoint)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`API request failed with status ${response.status}`);
                    }
                })
                .then((data) => {
                    setAnimals(Array.isArray(data) ? data : [data]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        }, 500),
        []
    );

    useEffect(() => {
        fetchAnimals();
    }, [fetchAnimals]);

    useEffect(() => {
        const loadImage = async (gattung) => {
            try {
                const image = await import(`../src/assets/${gattung}.jpg`);
                setAnimalImages((prevImages) => ({...prevImages, [gattung]: image.default}));
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        animals.forEach((animal) => {
            loadImage(animal.gattung);
        });
    }, [animals]);

    const handleSearch = () => {
        fetchAnimals(searchTerm);
    };

    return (
        <Container>
            <Layout>
                <Box sx={{mt: 4, mb: 4, textAlign: 'center'}}>
                    <Typography variant="h4" gutterBottom>
                        Tiere im Zoo
                    </Typography>
                </Box>
                <Box sx={{mb: 4, display: 'flex', alignItems: 'center'}}>
                    <TextField
                        label="Nach Gattung suchen"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                                e.preventDefault();
                            }
                        }}
                        fullWidth
                        sx={{mr: 2}}
                    />
                    <IconButton onClick={handleSearch} color="primary">
                        <SearchIcon/>
                    </IconButton>
                </Box>
                {loading ? (
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                        <CircularProgress/>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {animals.map((animal) => (
                            <Grid item xs={12} sm={6} md={4} key={animal.id}>
                                <Card>
                                    <CardMedia component="img" alt={animal.gattung} height="140"
                                               image={animalImages[animal.gattung]}/>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>{animal.gattung}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Nahrung: {animal.nahrung}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Gehege: {animal.gehegeId}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Layout>
        </Container>
    );
}

export default ZoobesucherPage;