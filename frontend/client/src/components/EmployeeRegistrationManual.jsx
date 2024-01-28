import React, {useState} from 'react';
import { Grid, TextField, ThemeProvider, 
    Typography, LinearProgress, Button} from '@mui/material';
import theme from './theme';

function EmployeeRegistration({data}) {

    let defaultValues = {
        id: "",
        first_name: "",
        last_name: "",
        wage: "",
        email:"",
        permission:""
    };

    if (data !== undefined){
        defaultValues = {
            id: data.employees.id,
            first_name: data.employees.first_name,
            last_name: data.employees.last_name,
            wage: data.employees.wage,
            email: data.employees.email,
            permission: data.employees.permission
            };
    }

    const [isRegistration] = useState(data === undefined)
    const [formValues, setFormValues] = useState(defaultValues);
    const [heading] = useState("Employee Management Form");
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
        fetch(`http://localhost:3030/api/updateEmployee/${data.employees.id}`, {
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

    const handleSubmit = async () => {
        if(isRegistration){

            const first = await fetch("https://dev-isqr3dj4.us.auth0.com/dbconnections/signup", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: "w0ur3W8xT91zcRcs9wRr1U18YwVJX8lG",
                    email: formValues.email,
                    given_name: formValues.first_name,
                    family_name: formValues.last_name,
                    name: formValues.first_name + " " + formValues.last_name,
                    user_metadata: {
                        roles: formValues.permission
                      },
                    password: "123456",
                    connection:"Username-Password-Authentication"

                })
            }).then( (response) => {
                if (response.status != 200){
                    window.alert(`Failed to create login `)
                  }                  
            });

        };

            const second = await fetch(`http://localhost:3030/api/employees`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValues)            
        }).then( (response) => {
            if (response.status !== 200){
                window.alert(`Failed to store employee information `)
              }
                        
            });
        
        window.location.reload();

    };

    const handleDelete = () => {
        fetch(`http://localhost:3030/api/DeleteEmployee/${data.employees.id}`, {
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
                    error={formValues["id"] === ""}
                    id="id-input"
                    name="id"
                    label="Employee ID"
                    type="number"
                    value={formValues.id}
                    onChange={handleInputChange}
                    ></TextField>
                </Grid>

                <Grid item>
                <TextField
                    required
                    error={formValues["fist_name"] === ""}
                    id="first_name-input"
                    name="first_name"
                    label="First Name"
                    type="text"
                    value={formValues.first_name}
                    onChange={handleInputChange}
                    ></TextField>    
                </Grid>
                
                <Grid item>
                    <TextField
                    required
                    error={formValues["last_name"] === ""}
                    id="last_name-input"
                    name="last_name"
                    label="Last Name"
                    type="text"
                    value={formValues.last_name}
                    onChange={handleInputChange}
                    ></TextField>
                </Grid>

                <Grid item>
                    <TextField
                    required
                    error={formValues["wage"] === ""}
                    id="wage-input"
                    name="wage"
                    label="Wage"
                    type="number"
                    value={formValues.wage}
                    onChange={handleInputChange}
                    ></TextField>
                </Grid>

                <Grid item>
                    <TextField
                    required
                    error={formValues["email"] === ""}
                    id="email-input"
                    name="email"
                    label="Email"
                    type="text"
                    value={formValues.email}
                    onChange={handleInputChange}
                    ></TextField>
                </Grid>

                <Grid item>
                    <TextField
                    required
                    error={formValues["permission"] === ""}
                    id="permission-input"
                    name="permission"
                    label="Permission"
                    type="text"
                    value={formValues.permission}
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

export default EmployeeRegistration;
