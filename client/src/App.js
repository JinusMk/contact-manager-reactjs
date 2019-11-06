import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import Home from './components/layout/Home'
import ContactList from './components/contacts/List'
import ContactNew from './components/contacts/New'
import ContactShow from './components/contacts/Show';
import ContactEdit from './components/contacts/Edit';
import NotesList from './components/notes/List'
import NewNote from './components/notes/New'
import NoteShow from './components/notes/Show'
import NoteEdit from './components/notes/Edit';
import UserRegister from './components/authentication/Register';
import UserLogin from './components/authentication/Login'
import axios from './config/axios'
import UserLogout from './components/authentication/Logout'
import HomePage from './components/Home/HomePage.'
import './styles/_app.scss'
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: !!localStorage.getItem('token')
    }
    this.handleIsAuthenticated = this.handleIsAuthenticated.bind(this)
  }
  handleIsAuthenticated(bool){
    this.setState(() => ({
      isAuthenticated: bool
    }))
  }

  render() {
    return (
      <BrowserRouter>
      <div>
      <Switch>
      
      <Route path="/" component= {UserLogin} handleIsAuthenticated={this.handleIsAuthenticated} exact = {true}/> 

        <Route path = "/" component = {HomePage} exact = {true}/>
       <Route path="/contacts" component = {ContactList} exact = {true}/>
       <Route path = "/contacts/new" component = {ContactNew} exact = {true}/>
       <Route path = "/contacts/:id" component = {ContactShow} exact = {true}/>
       <Route path = "/contacts/edit/:id" component = {ContactEdit}/>

       <Route path = "/notes" component = {NotesList} exact = {true}/>
       <Route path = "/notes/new" component = {NewNote} exact = {true}/>
       <Route path = "/notes/:id" component = {NoteShow} exact = {true}/>
       <Route path = "/notes/edit/:id" component = {NoteEdit}/>

       <Route path = "/users/register" component = {UserRegister} exact={true}/>
       <Route path = "/users/login" render = {() => <UserLogin handleIsAuthenticated = {this.handleIsAuthenticated}/> } exact = {true}/>
       <Route path = "/users/logout" component = {UserLogout}/>
       
       </Switch>
      
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
