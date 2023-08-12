import { useEffect, useState } from 'react';
import './App.css';
import IntroPage from './components/IntroPage';
import MainPage from './components/MainPage';

function App() {
  const [ isFirstVisit, setIsFirstVisit ] = useState(true);

  useEffect(() => {
    const isVisited = localStorage.getItem("is-visited");

    if (isVisited)
      setIsFirstVisit(false);
  }, []);

  const getStarted = () => {
    setIsFirstVisit(false);
    localStorage.setItem("is-visited", true);
  };

  return( 
    <div className="App">
      { isFirstVisit ? <IntroPage getStartedFn={getStarted} /> : <MainPage /> }
    </div>
  );
}

export default App;
