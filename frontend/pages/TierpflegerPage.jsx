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
    Button,
    IconButton,
} from '@mui/material';
import {Box} from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import {fetchAssignedAnimals, updateAnimal} from '../src/services/api.js';
import Layout from "../layout/Layout.jsx";

function TierpflegerPage() {
    const [tierpflegerId, setTierpflegerId] = useState('');
    const [assignedAnimals, setAssignedAnimals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [animalImages, setAnimalImages] = useState({});

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const fetchAssignedAnimalsDebounced = useCallback(
        debounce(async (id) => {
            setLoading(true);
            try {
                const data = await fetchAssignedAnimals(id);
                setAssignedAnimals(data);
            } catch (error) {
                console.error('Error fetching assigned animals:', error);
            }
            setLoading(false);
        }, 500),
        []
    );

    useEffect(() => {
        const loadImage = async (gattung) => {
            try {
                const image = await import(`../src/assets/${gattung}.jpg`);
                setAnimalImages((prevImages) => ({...prevImages, [gattung]: image.default}));
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        assignedAnimals.forEach((animal) => {
            loadImage(animal.gattung);
        });
    }, [assignedAnimals]);

    const handleUpdateAnimal = async (animalId) => {
        const updatedData = {
            gattung: document.getElementById(`gattung-${animalId}`).value,
            nahrung: document.getElementById(`nahrung-${animalId}`).value,
            gehegeId: parseInt(document.getElementById(`gehegeId-${animalId}`).value),
        };
        try {
            await updateAnimal(animalId, updatedData);
            setAssignedAnimals((prevAnimals) =>
                prevAnimals.map((animal) => (animal.id === animalId ? {...animal, ...updatedData} : animal))
            );
        } catch (error) {
            console.error('Error updating animal:', error);
        }
    };


    return (
        <Container>
            <Layout>
                <Box sx={{mt: 4, mb: 4, textAlign: 'center'}}>
                    <Typography variant="h4" gutterBottom>
                        Tierpfleger
                    </Typography>
                </Box>
                <Box sx={{mb: 4, display: 'flex', alignItems: 'center'}}>
                    <TextField
                        label="Tierpfleger-ID"
                        variant="outlined"
                        value={tierpflegerId}
                        onChange={(e) => setTierpflegerId(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                fetchAssignedAnimalsDebounced(tierpflegerId);
                                e.preventDefault();
                            }
                        }}
                        fullWidth
                        sx={{mr: 2}}
                    />
                    <IconButton onClick={() => fetchAssignedAnimalsDebounced(tierpflegerId)} color="primary">
                        <SearchIcon/>
                    </IconButton>
                </Box>
                {loading ? (
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                        <CircularProgress/>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {assignedAnimals.map((animal) => (
                            <Grid item xs={12} sm={6} md={4} key={animal.id}>
                                <Card>
                                    <CardMedia component="img" alt={animal.gattung} height="140"
                                               image={animalImages[animal.gattung]}/>
                                    <CardContent>
                                        <TextField
                                            id={`gattung-${animal.id}`}
                                            label="Gattung"
                                            defaultValue={animal.gattung}
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            id={`nahrung-${animal.id}`}
                                            label="Nahrung"
                                            defaultValue={animal.nahrung}
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            id={`gehegeId-${animal.id}`}
                                            label="Gehege ID"
                                            defaultValue={animal.gehegeId}
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            type="number"
                                        />
                                        <Button variant="contained" color="primary" sx={{mt: 2, width: '100%'}}
                                                onClick={() => handleUpdateAnimal(animal.id)}>
                                            Aktualisieren
                                        </Button>
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

export default TierpflegerPage;