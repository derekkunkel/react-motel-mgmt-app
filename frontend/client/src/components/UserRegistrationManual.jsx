import React, {useState} from 'react';
import { Grid, TextField, Button,
Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText} from '@mui/material';

function UserRegistration({data}) {
    let defaultValues = {
        fname: "",
        lname: "",
        email: "",
        address: "",
        license: "",
        dob: "",
        pnumber: ""
        };

    let dateString = "";

    if (data !== undefined){
        const date = new Date(data.guest.birthday);
        let utcMonth = String(date.getUTCMonth()).length === 1 ? `0${date.getUTCMonth()+1}`: date.getUTCMonth()+1;
        let utcDay = String(date.getUTCDate()).length === 1 ? `0${date.getUTCDate()}`: date.getUTCDate();
        dateString = `${date.getUTCFullYear()}-${utcMonth}-${utcDay}`;
        defaultValues = {
            fname: data.guest.first_name,
            lname: data.guest.last_name,
            email: data.guest.email,
            address: data.guest.address,
            license: data.guest.license_number,
            dob: dateString,
            pnumber: data.guest.number
            };
    }

    const [isRegistration] = useState(data === undefined)
    const [formValues, setFormValues] = useState(defaultValues);
    const [heading, setHeading] = useState("User Registration Form");
    const [buttonName, setButtonName] = useState("Next");
    const [show, setShow] = useState(true);
    const [show2, setShow2] = useState(false);
    const [progress, setProgress] = useState(50);
    const [open, setOpen] = useState(false);

    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    const handleClose = () => {
      setOpen(false);
    };

    const handleBack = () => {
        setProgress(50);
        setShow2(false);
        setShow(true);
        setButtonName("Next");
    };

    const handleDelete = () => {
        fetch(`http://localhost:3030/api/guest/${data.guest.guest_id}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json",
                        },
            });
        window.location.reload();
        
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
      };

    const handleNext = () => {
        switch (progress) {
            case 50:
                if (formValues["fname"] === "" || 
                formValues["lname"] === "" || 
                formValues["email"] === "" ||
                formValues["license"] === "" ||
                formValues["address"] === "" || 
                formValues["dob"] === "" || 
                formValues["pnumber"] === "" || validateEmail(formValues["email"]) === false )
                {
                    setOpen(true);

                } else {
                    setProgress(99);
                    setHeading("Payment Information")
                    if (isRegistration){
                        setButtonName("Register");
                    } else {
                        setButtonName("Update");

                    }
                    setShow(false);
                    setShow2(true);
                }

                break;
            case 99:
                if (isRegistration){
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

                } else {
                    fetch(`http://localhost:3030/api/guest/${data.guest.guest_id}`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formValues)
                    }).then( (response) => {
                        if (response.status !== 200){
                            window.alert(`Failed to store user information `)
                          } 
                          
                    });

                }
                
                setProgress(100);
                setShow(false);
                setShow2(false);
                window.location.reload();

                break;
        }

    };

  return (

    
    <>
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
       
        {show && <Grid container direction="column" spacing={3}>
            <Grid item>
                <TextField
                required
                error={formValues["fname"] === ""}
                id="fname-input"
                name="fname"
                label="First Name"
                type="text"
                fullWidth
                value={formValues.fname}
                onChange={handleInputChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    required
                    error={formValues["lname"] === ""}
                    fullWidth
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
                    required
                    error={formValues["email"] === ""}
                    id="email-input"
                    fullWidth
                    name="email"
                    label="Email"
                    type="text"
                    value={formValues.email}
                    onChange={handleInputChange}
                />
               
            </Grid>
            <Grid item>
            <TextField
                id="date"
                label="Birthday"
                fullWidth
                name="dob"
                type="date"
                value={formValues.dob}
                onChange={handleInputChange}
                InputLabelProps={{
                shrink: true,
                }}
            />
            </Grid>

            <Grid item>
                <TextField
                    required
                    fullWidth
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
                    error={formValues["pnumber"] === ""}
                    id="pnumber-input"
                    name="pnumber"
                    label="Phone Number"
                    fullWidth
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
                    fullWidth
                    name="license"
                    label="License Number"
                    type="text"
                    value={formValues.license}
                    onChange={handleInputChange}
                />
               
            </Grid>
            
               
        </Grid>}

    

        {show2 && <Grid container direction="column" spacing={3}>
            <br></br>
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
        
        <br></br>
        {data !== undefined && <Button variant="contained" color="error" size="large" onClick={handleDelete}>Delete</Button>}
        {show2&&<Button variant="contained" size="large" onClick={handleBack}>Back</Button>}
        <Button variant="contained" size="large" onClick={handleNext}>{buttonName}</Button>

        </>
        

    
  );
}

export default UserRegistration;