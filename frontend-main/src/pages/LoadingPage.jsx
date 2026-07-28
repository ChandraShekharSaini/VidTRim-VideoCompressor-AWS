import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function LoadingPage() {


   

    return (
        <section className='bg-[#040204] h-screen w-full flex flex-col items-center justify-center'>

            <img className='w-40' src="https://media2.giphy.com/media/DheQ9Yd2pjHmh9xpFZ/giphy.gif?cid=6c09b952xtzxgfrhe740vjq1eavkykro5xbjvugq50g5dos8&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s" alt="logo" />

            <img className='w-40 h-40' src="https://i.pinimg.com/originals/86/0e/6a/860e6ac4105b1365234bf836056effed.gif" />

        </section>
    );
}

