import React from 'react';
import Button from './button';
import Logo from './logo';

const Header = ({logo, themeToggle}) => (
  <header className="header">
    <Logo src={logo} />
    <Button
      className="button"
      onClick={themeToggle}
    >
      Random theme
    </Button>
  </header>
);

export default Header;