import React from 'react';
import {NavLink} from 'react-router-dom';
import '../App.css';

const Navigation = () => {
 

  return (
   
      <nav className='navigation'>
      <ul>
        <li>
          <NavLink to='/' className="link" >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/form' >
            Form
          </NavLink>
        </li>
        <li>
          <NavLink to='/register'>
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
