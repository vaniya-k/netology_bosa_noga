import React from 'react';
import Header from './Header';
import Footer from './Footer';
// import NotFound from './NotFound';
// import About from './About';
// import Contacts from './Contacts';
import TopSales from './TopSales';
import MainContainer from './MainContainer';

const App = () => {
  return (
    <>
    <Header/>
    <MainContainer>
      <TopSales/>
    </MainContainer>
    <Footer/>
    </>
  )
}

export default App;
