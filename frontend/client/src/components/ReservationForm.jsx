import React, {useState} from 'react';
import { ThemeProvider, 
    Button, 
    TextField} 
    from '@mui/material';
import theme from './theme';



function ReservationForm({data}) {

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

    function getProperDateFormat(d) {
      const date = new Date(d);
      let utcMonth = String(date.getUTCMonth()).length === 1 ? `0${date.getUTCMonth()+1}`: date.getUTCMonth()+1;
      let utcDay = String(date.getUTCDate()).length === 1 ? `0${date.getUTCDate()}`: date.getUTCDate();
      return `${date.getUTCFullYear()}-${utcMonth}-${utcDay}`;
    }

    let StartdateString = getProperDateFormat(data.booking.start_date);

    let EnddateString = getProperDateFormat(data.booking.end_date);

    let defaultValues = {
        res_id: data.booking.reservation_id,
        guest_id: data.booking.guest_id,
        room_id: data.booking.room_id,
        price: data.booking.price,
        start_date: StartdateString,
        end_date: EnddateString,
    };

    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
      };

    const handleUpdate = async () => {
      const diffDay = dateDiffInDays(getProperDateFormat(formValues.start_date), getProperDateFormat(formValues.end_date));
      const response = await fetch(`http://localhost:3030/api/rooms/${formValues.room_id}`)
      .then(response => response.json()).then(response => {return response}); 
      let bodyValues = formValues;
      bodyValues.price = diffDay * response[0].price;

      fetch(`http://localhost:3030/api/updateReservation/${formValues.res_id}`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(bodyValues)
            });
        window.location.reload();


    };

  return  (

    <>
    <ThemeProvider theme={theme}>
    
        <TextField
                id="start_date"
                label="Start Date"
                name="start_date"
                type="date"
                defaultValue={formValues.start_date}
                onChange={handleInputChange}
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
        <p/>
        <TextField
                id="end_date"
                label="End Date"
                name="end_date"
                type="date"
                defaultValue={formValues.end_date}
                onChange={handleInputChange}
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <br></br><hr/>
        <Button variant="contained" onClick={handleUpdate}>Update</Button>

    </ThemeProvider>
    </>
    
  );
}

export default ReservationForm;