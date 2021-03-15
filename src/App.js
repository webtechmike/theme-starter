import React, { useState } from 'react';
import CONFIG from './config.js';

import './scss/App.scss';

import Header from './components/header';
import Aside from './components/aside';
import Main from './components/main';
import Footer from './components/footer';

function App() {
  const [theme, setTheme] = useState(CONFIG.theme);
  const themes = ['dark', 'light', 'firebrick', 'darkblue', 'darkslategray', 'obsidian'];
  const setRandomTheme = themes => {
    const index = Math.floor(Math.random() * (themes.length - 0)) + 0;
    setTheme(themes[index]);
  }
  // const _themeToggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const _themeToggle = () => setRandomTheme(themes);

  return (
    <div className={`app ${theme}`} data-theme={theme}>
      <Header themeToggle={_themeToggle} />
      <Aside list={CONFIG.nav} />
      <Main heading={CONFIG.h1} content={CONFIG.content} />
      <Footer />
    </div>
  );
}

export default App;
