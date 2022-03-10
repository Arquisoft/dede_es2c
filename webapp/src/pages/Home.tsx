import React, { useState, useEffect, FC } from 'react';
import NavBar from '../components/NavBar';

const Home: FC = () => {

    return (
        <div className='Home'>
            <header className = "Home-header">
                <NavBar />
            </header>
        </div>

    )

}
export default Home;