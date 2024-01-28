import React, {useState} from 'react';
import { Grid, TextField, ThemeProvider, 
    Typography, LinearProgress, Button ,
Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText} from '@mui/material';
import theme from './theme';


const defaultValues = {
    fname: "",
    lname: "",
    email: "",
    address: "",
    license: "",
    dob: "",
    pnumber: "",
    password: ""
};

function UserRegistration() {

    const [formValues, setFormValues] = useState(defaultValues);
    const [heading, setHeading] = useState("User Registration Form");
    const [buttonName, setButtonName] = useState("Next");
    const [show, setShow] = useState(true);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [progress, setProgress] = useState(25);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
      };

    const handleNext = () => {
        console.log(formValues);
        switch (progress) {
            case 25:
                if (formValues["fname"] === "" || 
                formValues["lname"] === "" || 
                formValues["email"] === "" ||
                formValues["license"] === "" ||
                formValues["address"] === "" || 
                formValues["dob"] === "" || 
                formValues["pnumber"] === "")
                {
                    setOpen(true);

                } else {
                    setProgress(50);
                    setHeading("Payment Information")
                    setShow(false);
                    setShow2(true);
                    setShow3(false);
                }

                break;
            case 50:
                setProgress(99);
                setHeading("Create Password")
                setShow(false);
                setShow2(false);
                setShow3(true);
                setButtonName("Register");

                break;
            case 99:
                if (formValues["password"] === "")
                {
                    setOpen(true);

                } else {
                    fetch("http://localhost:3030/api/guest", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formValues)
                    }).then( (response) => {
                        if (response.status !== 200){
                            window.alert(`Failed to store user information `)
                          } 
                          
                    });

                    fetch("https://dev-isqr3dj4.us.auth0.com/dbconnections/signup", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            client_id: "w0ur3W8xT91zcRcs9wRr1U18YwVJX8lG",
                            email: formValues.email,
                            given_name: formValues.fname,
                            family_name: formValues.lname,
                            name: formValues.fname + " " + formValues.lname,
                            user_metadata: {
                                roles: "Customer" 
                              },
                            password: formValues.password,
                            connection:"Username-Password-Authentication"

                        })
                    }).then( (response) => {
                        if (response.status !== 200){
                            window.alert(`Failed to create login `)
                            window.location.href = '/';
                            return;
                          }
                          window.alert(`Successfully created account `)
                          window.location.href = '/';
                          
                    });
                
                }
                    
    
                break;
        }

    };

  return (

    
    <ThemeProvider theme={theme}>
        
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Missing Information"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Fill out all required fields before proceeding..
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

    <form>        
        <Typography variant="h3" margin="16px">{heading}</Typography>
        <LinearProgress variant="determinate" value={progress} />
        <br />

        {show && <Grid container direction="column" spacing={3}>
            <Grid item>
                <TextField
                required
                error={formValues["fname"] === ""}
                id="fname-input"
                name="fname"
                label="First Name"
                type="text"
                value={formValues.fname}
                onChange={handleInputChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    required
                    error={formValues["lname"] === ""}
                    id="lname-input"
                    name="lname"
                    label="Last Name"
                    type="text"
                    value={formValues.lname}
                    onChange={handleInputChange}
                />
               
            </Grid>
            <Grid item>
            <TextField
                id="date"
                label="Birthday"
                name="dob"
                type="date"
                defaultValue={Date.now()}
                onChange={handleInputChange}
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
               
            </Grid>
            <Grid item>
                <TextField
                    required
                    error={formValues["address"] === ""}
                    id="address-input"
                    name="address"
                    label="Address"
                    type="text"
                    value={formValues.address}
                    onChange={handleInputChange}
                />
               
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
                />
               
            </Grid>
            <Grid item>
                <TextField
                    required
                    error={formValues["pnumber"] === ""}
                    id="pnumber-input"
                    name="pnumber"
                    label="Phone Number"
                    type="text"
                    value={formValues.pnumber}
                    onChange={handleInputChange}
                />
               
            </Grid>
            <Grid item>
                <TextField
                    required
                    error={formValues["license"] === ""}
                    id="license-input"
                    name="license"
                    label="License Number"
                    type="text"
                    value={formValues.license}
                    onChange={handleInputChange}
                />
               
            </Grid>
        </Grid> }

        {show2 && <Grid container direction="column" spacing={3}>
            <br></br>
        <Typography variant="body2">Optional</Typography>
            <Grid item>
                <TextField
                id="cc-input"
                name="cc"
                label="Credit Card Number"
                type="text"
                />
            </Grid>
            <Grid item>
                <TextField
                id="exp-input"
                name="exp"
                label="Expiration Date"
                type="text"
                />
            </Grid>
            <Grid item>
                <TextField
                id="cvv-input"
                name="cvv"
                label="CVV"
                type="number"
                />
            </Grid>
        </Grid> }
        {show3 && <Grid container direction="column" spacing={3}>
            <br></br>
            <Grid item>
                <TextField
                disabled
                value={formValues.email}
                id="username-input"
                name="username"
                label="Username"
                type="text"
                />
            </Grid>
            <Grid item>
                <TextField
                required
                id="pwd-input"
                name="password"
                label="Password"
                type="password"
                onChange={handleInputChange}
                />
            </Grid>
        </Grid> }
        <br></br>
        <Button variant="contained" size="large" onClick={handleNext}>{buttonName}</Button>
        

    </form>
    </ThemeProvider>
    
  );
}

export default UserRegistration;