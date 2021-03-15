import React from 'react';

const Aside = ({list}) => (
  <aside className="aside">
    <ul>
      {list.map((item, i) => (
        <li key={i}><a href={item.link}>{item.title}</a></li>
      ))}
    </ul>
  </aside>
);

const MemoizedAside = React.memo(Aside);

export default MemoizedAside;