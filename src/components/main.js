import React from 'react';

const Main = ({heading, content}) => (
  <main className="main">
    <h1>{heading}</h1>
    <div>{content}</div>
  </main>
);

export default Main;