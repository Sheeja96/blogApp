import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation(); 

  return (
    <>
    {(location.pathname !== '/') && (location.pathname !== '/register') && (

    <AppBar position="static" >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Blog App
        </Typography>
        <Button color="inherit" component={Link} to="/add">
          Add Post
        </Button>
        <Button color="inherit" component={Link} to="/">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
    )}
    </>
  );
}

export default Navbar;
