import React from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends React.Component {
    render(){
        return(
            <div>
    <ul className="nav nav-tabs" id="myTab" role="tablist">
         <li className="nav-item">
    <Link to ="/" className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</Link>
          </li>
     <li className="nav-item">
       <Link to = "/contacts" className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" area-selected="false">Contacts</Link>
     </li>
  <li className="nav-item">
    <Link to = "/notes" className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Notes</Link>
  </li>
  <li className="nav-item">
    <Link to = "/users/logout" className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Logout</Link>
  </li>
</ul>
</div>
        )

    }
}