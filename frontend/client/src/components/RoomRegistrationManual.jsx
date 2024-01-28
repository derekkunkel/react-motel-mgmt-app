import React, {useState} from 'react';
import { Grid, TextField, ThemeProvider, 
    Typography, LinearProgress, Button} from '@mui/material';
import theme from './theme';

function RoomRegistrationManual({data}) {

    let defaultValues = {
        beds: "",
        price: "",
        type_id: "",
        max_guest: ""
    };

    if (data !== undefined){
        defaultValues = {
            id: data.rooms.id,
            beds: data.rooms.beds,
            price: data.rooms.price,
            type_id: data.rooms.type_id,
            max_guest: data.rooms.max_guest,
            };
    }

    const [isRegistration] = useState(data === undefined)
    const [formValues, setFormValues] = useState(defaultValues);
    const [heading] = useState("Room Management Form");
    const [show] = useState(true);
    const [progress] = useState(50);
    const [updateButtonName] = useState("Update");

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
          [name]: value,
        });
    };

    const handleUpdate = () => {
        fetch(`http://localhost:3030/api/updateRooms/${data.rooms.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValues)            
        }).then( (response) => {
            if (response.status !== 200){
                window.alert(`Failed to update user information `)
              } 
              
        });
        window.location.reload();
    };

    const handleSubmit = () => {
        if(isRegistration){
            fetch(`http://localhost:3030/api/rooms`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValues)            
        }).then( (response) => {
            if (response.status !== 200){
                window.alert(`Failed to store room information `)
              } 
              
            });
        }
        window.location.reload();

    };


    const handleDelete = () => {
        fetch(`http://localhost:3030/api/DeleteRoom/${data.rooms.id}`, {
                        method: 'delete',
                        headers: {
                            "Content-Type": "application/json",
                        },
            });
        window.location.reload();
        
    };

    return (
        <ThemeProvider theme={theme}>
            <form>
            <Typography variant="h4" margin="16px">{heading}</Typography>
            <LinearProgress variant="determinate" value={progress} />
            <br></br>

            {show && <Grid container direction="column" spacing={3}>
                <Grid item>
                    <TextField
                    required
                    error={formValues["beds"] === ""}
                    id="beds-input"
                    name="beds"
                    label="Number of Beds"
                    type="number"
                    value={formValues.beds}
                    onChange={handleInputChange}
                    ></TextField>
                </Grid>

                <Grid item>
                <TextField
                    required
                    error={formValues["price"] === ""}
                    id="price-input"
                    name="price"
                    label="Room Price ($)"
                    type="number"
                    value={formValues.price}
                    onChange={handleInputChange}
                    ></TextField>    
                </Grid>
                
                <Grid item>
                    <TextField
                    required
                    error={formValues["type_id"] === ""}
                    id="type_id-input"
                    name="type_id"
                    label="Room Type ID"
                    type="number"
                    value={formValues.type_id}
                    onChange={handleInputChange}
                    ></TextField>
                </Grid>

                <Grid item>
                    <TextField
                    required
                    error={formValues["max_guest"] === ""}
                    id="max_guest-input"
                    name="max_guest"
                    label="Maximum Guest"
                    type="number"
                    value={formValues.max_guest}
                    onChange={handleInputChange}
                    ></TextField>
                </Grid>
                <br></br>
            </Grid> }

            {data !== undefined && <Button variant="contained" size="large" onClick={handleUpdate}>{updateButtonName}</Button>} {data !== undefined && <Button variant="contained" color="error" size="large" onClick={handleDelete}>Delete</Button>}
            {data === undefined && <Button variant="contained" size="large" onClick={handleSubmit}>Submit</Button>}
            
            </form>
        </ThemeProvider>

    );
}

export default RoomRegistrationManual;

