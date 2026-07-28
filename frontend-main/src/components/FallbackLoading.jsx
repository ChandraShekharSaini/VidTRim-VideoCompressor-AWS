import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'

const FallbackLoading = () => {
    return (

        <>
            <Box className='w-screen h-screen flex flex-col gap-9 justify-center items-center bg-gray-950'>
                <CircularProgress />
                <p className='text-white text-2xl font-Montserrat'> Loading....</p>
            </Box>


        </>

    )
}

export default FallbackLoading