import React, { useState, useEffect, FC } from 'react';
import Button from '@mui/material/Button';
import { Stack  } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Container } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import NativeSelect from '@mui/material/NativeSelect';
import { lightBlue } from '@mui/material/colors';
import Filters from '../components/Filters'
const Products: FC = () => {

    return (
        
        <div className='Home'
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
        }}>
        {/* <div>     
        <Stack spacing={2} sx={{
            border:3, 
            borderColor:'primary.main',
            bgcolor: backgroundColor,
            borderRadius:1,
            position:"absolute",
            top:200
            
            }}>
            <Stack>
                <div>
                    <p> Mouses <Checkbox></Checkbox></p>                 
                </div>                    
            </Stack>
            <Stack>
                <div>
                    <p>Displays <Checkbox></Checkbox></p>                 
                </div> 
            </Stack>
            <Stack>
                <div>
                    <p>Keyboards <Checkbox></Checkbox></p>                 
                </div> 
            </Stack>
            <Stack>
                <div>
                    <p>Usb <Checkbox></Checkbox></p>                 
                </div> 
            </Stack>
            <Stack>
                <div>
                    <p>Speakers <Checkbox></Checkbox></p>                 
                </div> 
            </Stack>        
        </Stack >
        </div> */}
        
        <Container sx={{ width: 900, height: 350}} >
            <ImageList variant="masonry" cols={3} gap={8}>
                {imagesList.map((item) => (
                <ImageListItem key={item.img}>
                <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
    <div>
        <Container sx={{
                    position: "relative",
                    top:-250,
                    right:'10%'
                }}>
                <NativeSelect
            defaultValue={30}
            inputProps={{
            name: 'Filter',
            id: 'uncontrolled-native',
             }}
            >
            <option value={1}>Price: low to high</option>
            <option value={2}>Price: high to low</option>
            <option value={3}>Relevance</option>
            <option value={4}>Rating</option>
            </NativeSelect>
                
                </Container>
            </div>
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
const backgroundColor = lightBlue[50];
export default Products;