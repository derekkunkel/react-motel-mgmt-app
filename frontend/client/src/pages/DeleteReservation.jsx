import React, {useEffect, useState} from 'react';
import {
    Grid,
    TextField,
    Button,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableContainer, TableRow, Typography
} from '@mui/material';
import UserDetails from '../utilities/userDetails';
import { useAuth0 } from '@auth0/auth0-react';


const reservationDefaultValues = {
    reservation_id: "",
    guest_id: "",
    room_id: "",
    price: "",
    start_date: "",
    end_date: ""
};

const searchFormDefaultValues = {
    first_name: "",
    last_name: ""
}

function getProperDateFormat(d) {
    if (d === "")
    {
        return ""
    }
    const date = new Date(d);
    let utcMonth = String(date.getUTCMonth()).length === 1 ? `0${date.getUTCMonth()+1}`: date.getUTCMonth()+1;
    let utcDay = String(date.getUTCDate()).length === 1 ? `0${date.getUTCDate()}`: date.getUTCDate();
    return `${date.getUTCFullYear()}-${utcMonth}-${utcDay}`;
}



function DeleteRegistration(){

    const[searchFormValues, setSearchFormValues] = useState(searchFormDefaultValues);
    const[reservationData, setReservationData] = useState([]);
    const[reservationFormValues, setReservationFormValues] = useState(reservationDefaultValues)


    // Auth0 Code
    const {
        isAuthenticated,
        getAccessTokenSilently
    } = useAuth0();

    const [role, setRole] = useState(undefined);

    useEffect(() => {

        (async () => {
            try {
                const token = await getAccessTokenSilently();
                const userDetails = new UserDetails(token);
                await userDetails.initialize();
                setRole(userDetails.role);

            } catch (e) {
                console.error(e);
            }
        })();
    }, [getAccessTokenSilently]);


    // Takes the values of the clicked-on row from the reservation table
    // and sets the "Delete Reservation Form" values as the row values
    function getRow(row){
        setReservationFormValues(row)
    }

    async function searchReservations(e){
        const { name, value } = e.target;
        setSearchFormValues({
            ...searchFormValues,
            [name]: value,
        });

        fetch(`http://localhost:3030/api/reservations?lname=${searchFormValues.last_name}&fname=${searchFormValues.first_name}`)
            .then(response => response.json()).then(response => setReservationData(response));

        // fetch(`http://localhost:3030/api/getReservations?fname=${searchFormValues.first_name}&lname=${searchFormValues.last_name}`)
        //     .then(response => response.json()).then(response => setReservationData(response));
    }

    function handleReservationDelete(){
        fetch("http://localhost:3030/api/deleteReservation", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({reservation_id:reservationFormValues.reservation_id})
        }).then( (response) => {
            if (response.status !== 200){
                window.alert(`Error: Could not delete reservation.`)
            }
        });
    }

    function refreshPage() {
        window.location.reload();
    }

    return (role==="Manager" || role==="Employee") && isAuthenticated && (

        <div align="center">

            <Grid container
                  direction="column"
                  spacing={1}
            >
                {/*Guest Search Bar*/}
                <Grid item
                      padding={1}
                >

                    <TextField
                        sx={{ width: 600 }}
                        name='first_name'
                        label='Enter Guest First Name...'
                        value={searchFormValues.first_name}
                        onChange={searchReservations}>
                    </TextField>
                </Grid>

                <Grid item
                      padding={1}
                >
                    <TextField
                        sx={{ width: 600 }}
                        name='last_name'
                        label='Enter Guest Last Name...'
                        value={searchFormValues.last_name}
                        onChange={searchReservations}>
                    </TextField>
                </Grid>

                <Grid item
                >
                    <Button
                        align="center"
                        variant="contained"
                        size="Big"
                        onClick={searchReservations}
                    >
                        Search Reservations
                    </Button>
                </Grid>

                <Grid item
                      padding={1}
                >
                    <Typography
                        fontWeight={600}
                        color={"blue"}
                    >
                        Click reservation row to fill form.
                    </Typography>
                </Grid>

                <Grid item>
                    <TableContainer sx={{ width:800, height:300 }} aria-label="simple table">

                        {/*Guest Search Display Table*/}
                        <Table size="small" aria-label="dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Reservation ID</TableCell>
                                    <TableCell>Guest ID</TableCell>
                                    <TableCell>Room Number</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Start Date</TableCell>
                                    <TableCell>End Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reservationData.map((list, index) => (
                                    <TableRow key={index} onClick={() => getRow(list)}>
                                        <TableCell>{list.reservation_id}</TableCell>
                                        <TableCell>{list.guest_id}</TableCell>
                                        <TableCell>{list.room_id}</TableCell>
                                        <TableCell>{list.price}</TableCell>
                                        <TableCell>{getProperDateFormat(list.start_date)}</TableCell>
                                        <TableCell>{getProperDateFormat(list.end_date)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                        padding={2}
                    >
                        <Grid item>
                            <TextField
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="reservation_reservation_id"
                                label="Reservation ID"
                                name="reservation_reservation_id"
                                type="text"
                                value={reservationFormValues.reservation_id}
                            >
                            </TextField>
                        </Grid>

                        <Grid item>
                            <TextField
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="reservation_guest_id"
                                label="Guest ID"
                                name="reservation_guest_id"
                                type="text"
                                value={reservationFormValues.guest_id}
                            >
                            </TextField>
                        </Grid>

                        <Grid item>
                            <TextField
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="reservation_room_id"
                                label="Room Number"
                                name="id"
                                type="text"
                                value={reservationFormValues.room_id}
                            >
                            </TextField>
                        </Grid>

                        <Grid item>
                            <TextField
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="reservation_room_price"
                                label="Total Price"
                                name="room_price"
                                type="text"
                                value={reservationFormValues.price}
                            >
                            </TextField>
                        </Grid>

                        <Grid item>
                            <TextField
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="start_date"
                                label="Start Date"
                                name="start_date"
                                type="text"
                                value={getProperDateFormat(reservationFormValues.start_date)}
                            >
                            </TextField>
                        </Grid>

                        <Grid item>
                            <TextField
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="end_date"
                                label="End Date"
                                name="end_date"
                                type="text"
                                value={getProperDateFormat(reservationFormValues.end_date)}
                            >
                            </TextField>
                        </Grid>

                    </Grid>

                    <Grid item>
                        <Button
                            align="center"
                            variant="contained"
                            size="Big"
                            color="error"

                            onClick={() => {
                                if (window.confirm("Delete this reservation?"))
                                {
                                    handleReservationDelete();
                                    refreshPage();
                                }
                            }}
                        >
                            Delete Reservation
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>

    )
}

export default DeleteRegistration;