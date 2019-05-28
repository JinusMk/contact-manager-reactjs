import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link, Redirect } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import AppBarNew from './AppBar'
import NavBar from './NavBar'
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';



const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const pStyle = {
  width: 30,
  height: 30
}

const lstyle = {
  color: "#fff"
}

function ButtonAppBar(props) {
   
  const { classes } = props;
  console.log('isAuth', props.handleIsAuthenticated)
  return (
      <div>
          {
         <div className={classes.root}>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    {/* <MenuIcon /> */}
                    <img src = "https://i.pinimg.com/originals/bc/c1/d1/bcc1d1a873d7e58fed695a34ad29049a.png" style = {pStyle}/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                     Contact Manager
                    
                    </Typography>
                    <SearchIcon />
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          {/* <p>Messages</p> */}
    
          <IconButton color="inherit">
            <Badge badgeContent={11} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* <p>Notifications</p> */}

          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          {/* <p>Profile</p> */}

            
            
                  </Toolbar>
              
                </AppBar>
              </div>
          }
      </div>
   
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);