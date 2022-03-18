import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardHeader, CardMedia } from '@mui/material';
import TextField from '@mui/material/TextField';
import { borderLeft } from '@mui/system';


const AddProdutcAdmin: FC = () => {
    return (
        <div style={{margin: '200px',  borderLeft: '250px'}}>
            <Stack direction= "row">
                <Card sx = {{minWidth: 700, minHeight: 800}}>
                    <Stack direction = "column" spacing={3}>
                    <CardHeader title = 'Fotografía del producto' />

                      <CardMedia component= "img" height= "400" width= "300" image='https://i.postimg.cc/25fVD0hz/TE01.jpg' />
                        <p></p>
                        <div style={{borderLeft: '125px'}}> 
                        <Box sx = {{width: 600, height: 300, alignContent: 'center' }}>
                            <Stack direction = "column" spacing = {2}>
                                <TextField 
                                    id = "url"
                                    name = "Url Iamgen"
                                    label = "Url Imagen"
                                    size='small'
                                />
                                <Button variant = "contained">Cargar Imagen</Button>
                            </Stack>
                        </Box> 
                        </div>
                    </Stack>
                </Card>
                <Card sx = {{width: 700, minHeight: 800}}>
                </Card>
            </Stack>
        </div>
    );
} 


export default AddProdutcAdmin;