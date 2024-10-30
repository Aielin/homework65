import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/pages/about">About</NavLink></li>
        <li><NavLink to="/pages/contacts">Contacts</NavLink></li>
        <li><NavLink to="/pages/divisions">Divisions</NavLink></li>
        <li><NavLink to="/pages/admin">Admin</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navigation;
