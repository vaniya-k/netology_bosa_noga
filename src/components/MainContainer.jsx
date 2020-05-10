import React from 'react';
import Banner from './Banner';

const MainContainer = (props) => {
  return (
    <main className="container">
        <Banner/>
        {props.children}
    </main>
  )
};

export default MainContainer;
