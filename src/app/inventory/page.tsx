import Link from 'next/link'
import Grid from '@mui/material/Unstable_Grid2';

function Inventory() {
    return (
        <Grid container spacing={3} className="w-full min-h-screen p-10">
            <Grid xs={12}>
                <Link href="/" className="hover:bg-blue-500 transition duration-300 ease-in-out">Home</Link>
            </Grid>
            <Grid xs={4}>
                {/* Some ds.js stacked bar chart to capture inventory room */}
                <p>TODO: stacked bar chart</p>
            </Grid>
            <Grid xs={8}>
                {/* Some data table to track items */}
                <p>
                    TODO: data table
                </p>
            </Grid>
        </Grid>
    )
}

export default Inventory