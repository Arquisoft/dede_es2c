import React from "react";
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

export const HelpButton = () => {
    let nav = useNavigate();
    return (

        <div style={{position: 'fixed', bottom: '20px', right: '20px'}}>
        <IconButton color="primary" aria-label="Ayuda" onClick={()=> nav('help')}>
            <HelpIcon />
        </IconButton>
        </div>

    );
}