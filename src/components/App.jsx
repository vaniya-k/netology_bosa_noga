import React from 'react';
import Header from './Header';
import Footer from './Footer';
// import NotFound from './NotFound';
import About from './About';
// import Contacts from './Contacts';
import MainContainer from './MainContainer';

const App = () => {
  return (
    <>
    <Header/>
    <MainContainer>
      <About/>
    </MainContainer>
    <Footer/>
    </>
  )
}

export default App;
