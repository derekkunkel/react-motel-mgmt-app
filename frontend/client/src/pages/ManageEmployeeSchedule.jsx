import React, {useEffect, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid, TextField, Box, ThemeProvider, 
  Typography, Button, CircularProgress, Modal} from '@mui/material';
import theme from '../components/theme';
import UserDetails from '../utilities/userDetails';
import { DataGrid } from '@mui/x-data-grid';
import AddShiftBox from '../components/AddShiftBox';

const defaultValues = {
  start: "",
  end: ""
};

function ManageEmployeeSchedule() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [data, setData] = useState(null);
    const [formValues, setFormValues] = useState(defaultValues);
    const [heading] = useState("Manage Employee Schedules");
    const [buttonName] = useState("+ Add shift");
    const [show] = useState(true);
    const [selectionModel, setSelectionModel] = useState([])
    const [role, setRole] = useState(undefined);
    const [open, setOpen] = useState(false);
    

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
          setRole(userDetails.role);    
          
        } catch (e) {
          console.error(e);
        }
      })();
    }, [getAccessTokenSilently]);


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    const shiftTable = () => {
      if ( formValues["start"] === "")
        {
          window.alert("Please enter a date!");
        } else {
          console.log(formValues.start);
          fetch(`http://localhost:3030/api/empsched?start=${formValues.start}`, {
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

    const handleDelete = () => {
      var some = data.filter( (d) => { return selectionModel[0] === d.id })
      console.log(some);
      
      fetch(`http://localhost:3030/api/DeleteSchedule?id=${some[0].sched_id}`, {
    
        method: 'delete',
        headers: {
          "Content-Type": "application/json",
          },
      });
      window.location.reload();
    };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const columns = [
    { field: 'first_name', headerName: 'First Name', width: 110 }, 
    {field: 'last_name', headerName: 'Last Name', width: 110},
    {
      field: 'id',
      headerName: 'Employee ID',
      type: 'number',
      width: 110,
      editable: false,
      align: 'left' 
    },
    {
        field: 'start',
        headerName: 'Start Time',
        type: 'date',
        width: 120,
        editable: true,
        valueFormatter: (params) => {
          var d = new Date(params.value);
          var hours = (d.getUTCHours() < 10) ? d.getUTCHours() : d.getUTCHours();
          var minutes = (d.getUTCMinutes() < 10) ? "0" +  d.getUTCMinutes() : d.getUTCMinutes();
          var ampm = (hours >= 12) ? ' PM' : ' AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          var formattedTime = hours + ":" + minutes + ampm;
          return `${formattedTime}`;
        }
    },
    {
        field: 'end',
        headerName: 'End Time',
        type: 'date',
        width: 120,
        editable: true,
        valueFormatter: (params) => {
          var d = new Date(params.value);
          var hours = (d.getUTCHours() < 10) ? d.getUTCHours() : d.getUTCHours();
          var minutes = (d.getUTCMinutes() < 10) ? "0" + d.getUTCMinutes() : d.getUTCMinutes();
          var ampm = (hours >= 12) ? ' PM' : ' AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          var formattedTime = hours + ":" + minutes + ampm;
          return `${formattedTime}`;
        }
    },
    {
      headerName: 'Option',
      sortable: false,
      editable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <strong>
              <Button
                  variant="contained"
                  color="error"
                  size="small"
                  align="center" 
                  onClick={handleDelete}
              >
                  DELETE
              </Button>
          </strong>
      )
      },
  
    },
  ];

    if (isLoading) {
      return <CircularProgress />;
    } else if(!isAuthenticated && role !== "Manager") {
      return <div>Please login to your Manager account and try again</div>
    } else {
      return ( isAuthenticated && (
        <ThemeProvider theme={theme}>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <AddShiftBox/>
              </Box>
          </Modal>
  
        <form>        
            <Typography align="center" variant="h3" margin="16px">{heading}</Typography>
            <br />
  
            {show && <Grid container direction="column" alignItems="left" spacing={3}>
                <Grid item>
                <TextField
                    id="start"
                    label="Date"
                    name="start"
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
                <Button variant="contained" size="large" onClick={shiftTable}>Search</Button>
                </Grid>
        
                <Grid item>
                  <div style={{ height: 600, width: 750 }}>
                    <DataGrid
                      rows={data}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                      }}
                      selectionModel={selectionModel}
                      {...data}
                    />
                  </div>
                </Grid>
            </Grid> }
            <Button align="left" size="large" onClick={handleOpen}>{buttonName}</Button> 
  
        </form>
        </ThemeProvider>
      ));
    }

}

export default ManageEmployeeSchedule;