import React from 'react';

const Main = ({style, children}) => {

  return (
    <main style={style.Container}>
      <section style={style.Grid}>
        {children}
      </section>
    </main>
  );

};

export default Main;
