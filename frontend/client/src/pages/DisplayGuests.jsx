import React, {useState, useEffect} from 'react';
import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import UserDetails from '../utilities/userDetails';
import { useAuth0 } from '@auth0/auth0-react';

const guestDefaultValues = {
    guest_id: "",
    first_name: "",
    last_name: "",
    address: "",
    number: "",
    birthday: "",
    license_number: "",
    email: ""
};

const guestReservationDefaultValues = {
    guest_id: ""
};

const roomReservationDefaultValues = {
    reservation_id: "",
    room_id: "",
    price: ""
};


const defaultStartDate = {
    start_date: ""
}

const defaultEndDate = {
    end_date: ""
}

function DisplayGuests(){

    const[guestData, setGuestData] = useState([])   // Data from SQL guest table
    const[searchFormValues, setSearchFormValues] = useState(guestDefaultValues);    // Guest search bar value
    const[roomData, setRoomData] = useState([]);    // Data from SQL rooms table
    const[guestReservationFormValues, setGuestReservationFormValues] = useState(guestReservationDefaultValues) // Guest ID value from clicked table row
    const[roomReservationFormValues, setRoomReservationFormValues] = useState(roomReservationDefaultValues) // Room values from clicked table row
    const[reservationStartDate, setReservationStartDate] = useState(defaultStartDate)
    const[reservationEndDate, setReservationEndDate] = useState(defaultEndDate)
    const[totalPrice, setTotalPrice] = useState("")


    // Auth0
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
    // End of Auth0


    function dateDiffInDays(a, b) {
        a = new Date(a);
        b = new Date(b);
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    }

    function calculateTotalPrice(){
        const room_price = roomReservationFormValues.price
        const start_day = reservationStartDate.start_date
        const end_day = reservationEndDate.end_date

        const dateDiff = dateDiffInDays(start_day, end_day)

        const total_price = (room_price * dateDiff).toFixed(2)
        const total_price_str = String (total_price)

        setTotalPrice(total_price_str);
    }

    function getRowGuest(row){
        setGuestReservationFormValues(row)
    }

    function getRowRoom(row){
        setRoomReservationFormValues(row);
        calculateTotalPrice()
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

    async function searchGuests(e){

        const { name, value } = e.target;
        setSearchFormValues({
            ...searchFormValues,
            [name]: value,
        });

        fetch(`http://localhost:3030/api/searchGuest?lname=${searchFormValues.last_name}`)
            .then(response => response.json())
            .then(response => setGuestData(response));
    }

    async function getRooms(e){

        const { name, value } = e.target;
        setSearchFormValues({
            ...searchFormValues,
            [name]: value,
        });
        const start_date = reservationStartDate.start_date
        const end_date = reservationEndDate.end_date

        fetch(`http://localhost:3030/api/free_rooms?start_date=${start_date}&end_date=${end_date}`)
            .then(response => response.json())
            .then(response => setRoomData(response));
    }

    function handleReservationSubmit(){
        const queryData = {
            guest_id:guestReservationFormValues.guest_id,
            room_id: roomReservationFormValues.id,
            price: parseFloat(totalPrice),
            start_date: reservationStartDate.start_date,
            end_date: reservationEndDate.end_date
        }

        fetch("http://localhost:3030/api/reserve", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(queryData)
        }).then( (response) => {
            if (response.status !== 200){
                window.alert(`Error: Could not make reservation.`)
            }
            window.alert(`Reservation Created`)
        });

    }

    function handleStartDateChange(e) {
        const {name, value} = e.target;
        setReservationStartDate({
            ...reservationStartDate,
            [name]: value,
        })
    }

    function handleEndDateChange(e) {
        const {name, value} = e.target;
        setReservationEndDate({
            ...reservationEndDate,
            [name]: value,
        })
    }

    return (role==="Manager" || role==="Employee") && isAuthenticated && (

        <>
            <Grid container
                  direction="row"
                  spacing="5"
            >

                    <Grid item
                          padding={1}
                    >
                        <Typography
                            variant="h5"
                        >
                            Make A Reservation
                        </Typography>
                    </Grid>

                <Grid container direction="column">

                    <Grid item
                    >
                        {/*Guest Search Bar*/}
                        <TextField
                            sx={{ width: 600 }}
                            name='last_name'
                            label='Search Guest By Last Name...'
                            value={searchFormValues.last_name}
                            onChange={searchGuests}>
                        </TextField>
                    </Grid>

                    <Grid item
                          padding={1}
                    >
                        <Typography
                            fontWeight={600}
                            color={"blue"}
                        >
                            Single-click customer row to fill form.
                        </Typography>
                    </Grid>

                    <Grid item>
                        <TableContainer sx={{ width:800, height:300 }} aria-label="simple table">

                            {/*Guest Search Display Table*/}
                            <Table size="small" aria-label="dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Guest ID</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Phone Number</TableCell>
                                        <TableCell>Birthday</TableCell>
                                        <TableCell>License Number</TableCell>
                                        <TableCell width="300">Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {guestData.map((list, index) => (
                                        <TableRow key={index} onClick={() => getRowGuest(list)}>
                                            <TableCell>{list.guest_id}</TableCell>
                                            <TableCell>{list.first_name}</TableCell>
                                            <TableCell>{list.last_name}</TableCell>
                                            <TableCell>{list.address}</TableCell>
                                            <TableCell>{list.number}</TableCell>
                                            <TableCell>{getProperDateFormat(list.birthday)}</TableCell>
                                            <TableCell>{list.license_number}</TableCell>
                                            <TableCell>{list.email}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>


                <Grid item
                      padding={1}
                >
                    <Typography
                        variant="h6"
                    >
                        Select Start and End Dates For Stay:
                    </Typography>
                </Grid>


                {/* Date selection container */}
                <Grid container
                      direction="row"
                      spacing={1}
                      padding={2}
                >
                    <Grid item>

                    </Grid>
                    <Grid item>
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            id="start_date"
                            label="Start Date"
                            name="start_date"
                            type="date"
                            onChange={handleStartDateChange}
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
                            type="date"
                            onChange={handleEndDateChange}
                        >
                        </TextField>
                    </Grid>
                </Grid>


                <Grid container
                      direction = "column"
                >

                    <Grid item
                          padding={1}
                    >
                        {/* Get Current Available Rooms Button*/}
                        <Button
                            align="right"
                            variant="contained"
                            size="large"
                            onClick={getRooms}
                        >
                            Get Available Rooms
                        </Button>
                    </Grid>

                    <Grid item
                          padding={1}

                    >
                        <Typography
                            fontWeight={600}
                            color={"blue"}
                        >
                            Double-click room row to correctly fill form.
                        </Typography>
                    </Grid>

                    <Grid item>
                        {/*Room Display Table*/}
                        <TableContainer sx={{ width:800, height:300 }} aria-label="simple table">
                            <Table size="small" aria-label="dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Room Number</TableCell>
                                        <TableCell>Number of Beds</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Room Type</TableCell>
                                        <TableCell>Max Guests</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {roomData.map((list, index) => (
                                        <TableRow key={index} onClick={() => getRowRoom(list)}>
                                            <TableCell>{list.id}</TableCell>
                                            <TableCell>{list.beds}</TableCell>
                                            <TableCell>{list.price}</TableCell>
                                            <TableCell>{list.type_id}</TableCell>
                                            <TableCell>{list.max_guest}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>


            <Grid
                container
                direction="row"
                align="left"
                spacing={2}
            >
                <Grid item>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="reservation_guest_id"
                        label="Guest ID"
                        name="reservation_guest_id"
                        type="text"
                        value={guestReservationFormValues.guest_id}
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
                        value={roomReservationFormValues.id}
                    >
                    </TextField>
                </Grid>

                <Grid item>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="reservation_room_price"
                        label="Room Price"
                        name="room_price"
                        type="text"
                        value={roomReservationFormValues.price}
                    >
                    </TextField>
                </Grid>

                <Grid item>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="reservation_total_price"
                        label="Total Price"
                        name="total_price"
                        type="text"
                        value={totalPrice}
                        min="1"

                    >
                    </TextField>
                </Grid>

            </Grid>

            <Grid item
                  padding={1}
            >
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                        if (window.confirm("Create this reservation?"))
                        {
                            handleReservationSubmit();
                        }
                    }}

                >
                    Make Reservation
                </Button>
            </Grid>

        </>

    )
}

export default DisplayGuests;