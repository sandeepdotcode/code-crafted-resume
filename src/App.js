import { Component } from 'react';
import './App.css';
import IntroPage from './components/IntroPage';
import MainPage from './components/MainPage';

class App extends Component {
  constructor() {
    super();

    this.state = {
      CurrentPage : IntroPage,
    }

    this.gotoBuilder = this.gotoBuilder.bind(this);
  }

  gotoBuilder() {
    this.setState({
      CurrentPage: MainPage,
    })
  }

  render() {
    const { CurrentPage } = this.state;
    
    return( 
      <div className="App">
       <CurrentPage getStartedFn={this.gotoBuilder} />
      </div>
    );
  }
}

export default App;
