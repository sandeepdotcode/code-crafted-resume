import { useState } from 'react';
import './App.css';
import IntroPage from './components/IntroPage';
import MainPage from './components/MainPage';

function App() {
  const [CurrentPage, setCurrentPage ] = useState(() => MainPage); // default should be IntroPage, changed now for dev

  const gotoBuilder = () => {
    setCurrentPage(() => MainPage);
  }

  return( 
    <div className="App">
      <CurrentPage getStartedFn={gotoBuilder} />
    </div>
  );
}

export default App;
