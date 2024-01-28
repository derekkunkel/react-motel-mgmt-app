import React, {useState} from 'react';
import { Grid, TextField, ThemeProvider, 
    Typography, Button,} from '@mui/material';
import theme from './theme';

function AddShiftBox() {

    let defaultValues = {
        id: "",
        start: "",
        end: "",
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
          [name]: value,
        });
    };

    const [formValues, setFormValues] = useState(defaultValues);
    const [heading] = useState("Add A Shift");
    const [show] = useState(true);    

    const handleSubmit = () => {
        if(formValues["start"] !== "" || 
            formValues["end"] !== ""){
            fetch(`http://localhost:3030/api/schedule`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValues)            
        }).then( (response) => {
            if (response.status !== 200){
                window.alert(`Failed to store shift information `)
              } 
              
            });
        }
        window.location.reload();

    };

    

    return (
        <ThemeProvider theme={theme}>
            <form>
            <Typography variant="h4" margin="16px">{heading}</Typography>
            <br></br>
            {show && <Grid container direction="column" spacing={3}>
                <Grid item>
                    <TextField
                    id="employee_id"
                    name="id"
                    label="Employee ID"
                    type="number"
                    onChange={handleInputChange}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    ></TextField>
                </Grid>

                <Grid item>
                    <TextField
                    id="start_time"
                    name="start"
                    label="Start Time"
                    type="datetime-local"
                    defaultValue={Date.now()}
                    onChange={handleInputChange}
                    sx={{ width: 300 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    ></TextField>
                </Grid>
                
                <Grid item>
                    <TextField
                    id="end_time"
                    name="end"
                    label="End Time"
                    type="datetime-local"
                    defaultValue={Date.now()}
                    onChange={handleInputChange}
                    sx={{ width: 300 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    ></TextField>
                </Grid>
                <br></br>
            </Grid> }
            <Button variant="contained" size="large" onClick={handleSubmit}>Submit</Button>
            
            </form>
        </ThemeProvider>

    );
}

export default AddShiftBox;

