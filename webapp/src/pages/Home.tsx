import React, { useState, useEffect, FC } from 'react';
import { Image } from '@mui/icons-material';
import { Container } from '@mui/material';
import img1 from '../img/MO01.jpg';
import img2 from '../img/AL01.jpg';
import img3 from '../img/RA01.jpg';
const Home: FC = () => {
    return (
        <div className='Home'
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
        }}>
            <img src= {img1}/>
            <img src= {img2}/>
            <img src= {img3}/>
            
            
        </div>
    )

}
export default Home;