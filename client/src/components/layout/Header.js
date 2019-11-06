import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Link, Redirect } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ContactPhoneOutlinedIcon from '@material-ui/icons/ContactPhoneOutlined';
import Logo from './logo.svg'
export default class Headder extends Component{
  constructor(props){
    super(props);
    this.state = {
      flag: false,
      anchorEl: null,
      logoutFlag: false
    };
  }
  handleClick=(event)=>{
    const anchorEl = event.currentTarget
    this.setState((prevState)=>({
      flag: !prevState.flag,
      anchorEl
    }))
  }
  handleClose=()=>{
    this.setState((prevState)=>({
      flag: !prevState.flag
    }))
  }
  handleLogout=()=>{
    localStorage.clear();
    this.setState({
      logoutFlag: true
    })
  }
  render(){
    const { flag, anchorEl, logoutFlag } = this.state
    if(logoutFlag){
      return <Redirect to="/login"/>
    }
    const userName = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).username : ''
    return(
        <React.Fragment>
            <header>
               <Grid container spacing={0} alignItems="center" style={{height: '100%'}}>
                     <Grid item xs={3} className="header-logo">
                         <img src={Logo} alt="logo" />
                         <h3>Contact Manager</h3>
                     </Grid>
                       {userName ?  <Grid item xs={9} className="user-dropdown" >
                       <ul aria-controls="fade-menu" onClick={this.handleClick}>
                           <li>
                             <Avatar className="user-avator">A</Avatar>
                           </li>
                           <li>Hi <span>{userName}</span></li>
                           {/* <li><img src={`${S3_ASSETS_PATH}/images/down-arrow.svg`} alt="down-arrow"/></li> */}
                       </ul>
                       <Menu
                            id="fade-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={flag}
                            onClose={this.handleClose}
                            TransitionComponent={Fade}
                            className="header-drop-down"
                        >
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                       </Menu>
                     </Grid> : ''
                       }
               </Grid>
            </header>
            <div style={{height: 80}}>
            </div>
        </React.Fragment>
    )
  }
}