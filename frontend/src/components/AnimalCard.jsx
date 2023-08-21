import React from 'react';
import {Card, CardMedia, CardContent, TextField, Button} from '@mui/material';

function AnimalCard({animal, animalImages, onUpdateAnimal}) {
    const handleUpdateAnimal = () => {
        const updatedData = {
            gattung: document.getElementById(`gattung-${animal.id}`).value,
            nahrung: document.getElementById(`nahrung-${animal.id}`).value,
            gehegeId: parseInt(document.getElementById(`gehegeId-${animal.id}`).value),
        };
        onUpdateAnimal(animal.id, updatedData);
    };

    return (
        <Card>
            <CardMedia
                component="img"
                alt={animal.gattung}
                height="140"
                image={animalImages[animal.gattung]}
            />
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
                <Button
                    variant="contained"
                    color="primary"
                    sx={{mt: 2}}
                    onClick={handleUpdateAnimal}
                >
                    Aktualisieren
                </Button>
            </CardContent>
        </Card>
    );
}

export default AnimalCard;