//NAV BAR EXPORTED HERE

import React from "react";
import {Link, Route, BrowserRouter as Router} from "react-router-dom";
import "./Navbar.css"
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import {logOut} from "../auth/Logout"

  

export const Navbar = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  return (
    <div>
      <Button aria-controls="customized-menu" aria-haspopup="true" 
        variant="contained"
        onClick={handleClick}
        className="navBar">
        Open Menu
      </Button>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <StyledMenuItem onClick={handleClose}><Link to="/">My Dashboard</Link></StyledMenuItem>
        <StyledMenuItem onClick={handleClose}><Link to="/contacts">My Connections</Link></StyledMenuItem>
        <StyledMenuItem onClick={handleClose}><Link to="/followup">My Follow Ups</Link></StyledMenuItem>
        <StyledMenuItem onClick={logOut}>Logout</StyledMenuItem>
      </StyledMenu>
    </div>
  );
}