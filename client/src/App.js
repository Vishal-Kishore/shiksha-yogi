import React from 'react';
import { BrowserRouter as Router , Route ,Switch } from "react-router-dom";
import Join from './components/Join/Join';

import Footer from './components/footer/Footer';


const App = () => { 
    return (
        <>
  
        <Router>
           <Switch>
               <Route></Route>
           </Switch>
        </Router>
        <Join/>
    <Footer></Footer>
    </>
    );
};

export default App;

