import React from 'react';
import Banner from './Banner';
import Footer from './Footer';
import Header from './Header';

const PageContainer = (props) => {
  return (
    <>
      <Header currLink={props.currLink}/>
      <main className="container">
          <Banner/>
          {props.children}
      </main>
      <Footer/>
    </>
  )
};

export default PageContainer;
