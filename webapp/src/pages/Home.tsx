import React, { useState, useEffect, FC } from 'react';
import { Image } from '@mui/icons-material';
import { Container } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
const Home: FC = () => {
    return (
        <div className='Home'
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
        }}>
        <Container sx={{ width: 1100, height: 400}}>
            <ImageList variant="masonry" cols={3} gap={8}>
                {imagesList.map((item) => (
                <ImageListItem key={item.img}>
                <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
             <ImageListItemBar position="bottom" title={item.description} />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
            
            
        </div>
    )
}

const imagesList = [
    {
        img:'./img/MO01.jpg',
        title:'display',
        description: 'Display 200€',
    },    
    {
        img: './img/AL01.jpg',
        title:'speaker',
        description: 'Speaker 15€',
    },
    {
        img: './img/RA01.jpg',
        title:'mouse',
        description: 'Mouse 10€',
    },
    {
        img:'./img/US01.jpg',
        title:'usb',
        description: 'Usb 15€',
    },
    {
        img: './img/TE01.jpg',
        title:'keyboard',
        description: 'Keyboard 40€',
    }
];
export default Home;