import React, { useState, useEffect, useCallback } from 'react';
import CONFIG from './app-config.js';

import SVG from './logo.svg';
import 'font-awesome/css/font-awesome.min.css';
import './scss/App.scss';

import Header from './components/header';
import Aside from './components/aside';
import Main from './components/main';
import Footer from './components/footer';

function App() {
  const [theme, setTheme] = useState(CONFIG.theme);
  const [themes, setThemes] = useState([]);

  const getRandomTheme = useCallback(() => {
    const index = Math.floor(Math.random() * (themes.length - 0)) + 0;
    return themes[index];
  }, [themes]);

  const setRandomTheme = useCallback(() => {
    setTheme(getRandomTheme());
  }, [getRandomTheme]);

  const _fetchThemes = () => {
    return CONFIG.themes;
  };

  useEffect(themes => {
    setThemes(_fetchThemes);
  }, [themes]);

  return (
    <div className={`app ${theme}`} data-theme={theme}>
      <Header logo={SVG} themeToggle={setRandomTheme} />        
      <Aside list={CONFIG.nav} />
      <Main
        heading={CONFIG.h1}
        content={CONFIG.content}
      />
      <Footer />
    </div>
  );
}

export default App;
