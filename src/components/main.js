import React from 'react';

const Main = ({heading, content, children}) => (
  <main className="main">
    <h1>{heading}</h1>
    <div>{content}</div>
    {children}
  </main>
);

export default Main;