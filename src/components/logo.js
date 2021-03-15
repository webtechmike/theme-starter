import React from 'react';

const DarkMagic = () => {
  let app = document.querySelector('.app');
  let isDark = app.classList.contains('dark');
  let isLight = app.classList.contains('light');

  if (isDark || isLight) {
    app.classList = 'app';
  } else {
    app.classList = 'app dark';
  }

  if(isDark) {
    app.classList.add('light');
  } else if (isLight) {
    app.classList.add('dark');
  }
}

const Logo = ({src}) => (
  <div className="logo" onClick={DarkMagic}>
    <img src={src} alt="LOGO" />
  </div>
);

export default Logo;