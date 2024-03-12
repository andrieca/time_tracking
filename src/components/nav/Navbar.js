import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../index';


const Navbar = ({user}) => {
    
       const {auth} = useContext(Context);
   
    console.log("userNav", user)
    return (
        <AppBar color = {'secondary'} position="static" style={{ backgroundColor: '#ba000d' }}>
        <Toolbar >
          <Grid container justifyContent={"flex-end"}>
            {user? 
            <Button onClick={() => auth.signOut()} variant='outlined'>out</Button>
            :
            <NavLink to="/loginDay">
                <Button variant='outlined'>login</Button>
            </NavLink>
            }
          </Grid>
          <Grid></Grid>
        </Toolbar>
      </AppBar>
    );
}

export default Navbar;