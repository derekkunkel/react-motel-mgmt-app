import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

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

export default function DataGridDemo() {
    var [data, setData] = React.useState(null);

    React.useEffect(() => {
        let isMounted = true;
        fetch('http://localhost:3030/api/free_rooms')
            .then(res =>
            { return res.json()
            })
            .then(data => {
                if (isMounted) {
                    setData(data)
                }
            })
        return () => { isMounted = false };
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}