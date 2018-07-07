import React, { Component } from 'react';
import Countdown from './Countdown';
import './App.css';
import './sass/bundle.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            concertDateTime : new Date(1531598400000)
        }
    }
    render() {
        return (
            <div className="App">
                <Countdown concertDateTime={this.state.concertDateTime}/>
            </div>
        );
    }
}

export default App;
