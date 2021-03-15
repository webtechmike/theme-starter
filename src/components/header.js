import React from 'react';

const Header = props => (
  <header className="header">
    <button id="theme-toggle" onClick={props.themeToggle}>GO</button>
    {props.children}
  </header>
);

export default Header;