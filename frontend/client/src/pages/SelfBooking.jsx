import React, {useState, useEffect} from 'react';
import { Grid, TextField, ThemeProvider, 
    Typography, LinearProgress, Button ,
Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, CircularProgress} from '@mui/material';
import theme from '../components/theme';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetails from '../utilities/userDetails';


const defaultValues = {
    start_date: "",
    end_date: ""
};

const columns = [
  { field: 'id', headerName: 'Room Number', width: 110 },
  {
    field: 'beds',
    headerName: 'Number of Beds',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price Per Night',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'type_id',
    headerName: 'Room Type',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'max_guest',
    headerName: 'Capacity',
    type: 'number',
    width: 110,
    editable: true,
  },
];

function dateDiffInDays(a, b) {
  console.log(a)
  console.log(b)
  a = new Date(a);
  b = new Date(b);
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

function SelfBook() {
    const [data, setData] = useState(null);
    const [formValues, setFormValues] = useState(defaultValues);
    const [heading] = useState("Make a Reservation");
    const [buttonName] = useState("Reserve");
    const [show, setShow] = useState(true);
    const [progress, setProgress] = useState(50);
    const [open, setOpen] = useState(false);
    const [selectionModel, setSelectionModel] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [role, setRole] = useState(undefined);

    const {
      isLoading,
      isAuthenticated,
      getAccessTokenSilently
    } = useAuth0();

    useEffect(() => {
      
      (async () => {
        try {
          const token = await getAccessTokenSilently();
          console.log(token)
          const userDetails = new UserDetails(token);
          await userDetails.initialize();
          setUserInfo(userDetails)
          setRole(userDetails.role);    
          
        } catch (e) {
          console.error(e);
        }
      })();
    }, [getAccessTokenSilently]);

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
        var guestID, roomPrice
        if (
          formValues["start_date"] === "" || 
          formValues["end_date"] === "")
          {
            setOpen(true);
          } else {
            fetch(`http://localhost:3030/api/getGuestIdByEmail?email=${userInfo.email}`, {
            method: 'GET',
            headers: {
            "Content-Type": "application/json"
            }
            })
            .then( res => {
              return res.json()
            })
            .then( res => {
            guestID = res[0].guest_id
            fetch(`http://localhost:3030/api/getRoomPrice?room_id=${selectionModel[0]}`, {
            method: 'GET',
            headers: {
            "Content-Type": "application/json"
            }
            })
            .then(res => {
              return res.json()
            })
            .then((res) => {
              roomPrice = res[0].price
              roomPrice = roomPrice * dateDiffInDays(formValues["start_date"], formValues["end_date"])
              fetch(`http://localhost:3030/api/selfReserve?room_id=${selectionModel[0]}&price=${roomPrice}&guest_id=${guestID}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues)
                })
                .then( (response) => {
                  if (response.status !== 200){
                    window.alert(`Failed to make reservation`)
                }   
                });
                setProgress(100);
                setShow(false);
            })
          })
                      
          }
    };

    const refreshTable = () => {
      if (
        formValues["start_date"] === "" || 
        formValues["end_date"] === "" )
        {
          setOpen(true);
        } else {
          fetch(`http://localhost:3030/api/free_rooms?start_date=${formValues.start_date}&end_date=${formValues.end_date}`, {
            method: 'GET',
            headers: {
            "Content-Type": "application/json"
            }
          })
          .then(res => 
            { return res.json()
          })
          .then(data => {
              setData(data)
          })
        }
  };

  if (isLoading) {
    return <CircularProgress />;
  } else if(!isAuthenticated && role !== "Customer") {
    return <div>Please login to your customer account and try again</div>
  } else {
    return ( isAuthenticated && (
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

          {show && <Grid container direction="column" alignItems="center" justifyContent="center" spacing={3}>
              <Grid item>
              <TextField
                  id="start_date"
                  label="Start Date"
                  name="start_date"
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
                  id="end_date"
                  label="End Date"
                  name="end_date"
                  type="date"
                  defaultValue={Date.now()}
                  onChange={handleInputChange}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                  shrink: true,
                  }}
              />
              </Grid>
              <br></br>
              <Button variant="contained" size="large" onClick={refreshTable}>Search</Button>
              <Grid item>
                <div style={{ height: 400, width: 700 }}>
                  <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={(newSelectionModel) => {
                      setSelectionModel(newSelectionModel);
                    }}
                    selectionModel={selectionModel}
                    {...data}
                  />
                </div>
              </Grid>
              <br></br>
            <Button variant="contained" size="large" onClick={handleNext}>{buttonName}</Button>
          </Grid> }       

      </form>
      </ThemeProvider>
    ));
  }
}

export default SelfBook;