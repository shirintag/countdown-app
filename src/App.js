import React, { Component } from 'react';
import Countdown from './Countdown';
import './App.css';
import './sass/bundle.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            concertDateTime: null,
            loadingData: true,
            noData: false
        }

        this._fetchData = this._fetchData.bind(this);
    }

    _fetchData() {
        fetch('./data/concertData.json').then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                var error = new Error(response.statusText)
                error.response = response;
                throw error;
            }
        }).then(
            response => response.json()
        ).then(json => {
            console.log(json);
            this.setState({
                concertDateTime: new Date(json.concertTimestamp),
                loadingData: false
            })
        }).catch(error => {
            console.log(error.response ? error.response : error);
            this.setState({
                loadingData: false,
                noData: true
            })

        });
    }

    componentDidMount() {
        this._fetchData();
    }

    render() {
        return (
            <div className="App">
                { this.state.loadingData && <div>Searching for concerts</div> }
                { this.state.concertDateTime && <Countdown concertDateTime={this.state.concertDateTime}/> }
                { this.state.noData && <p className="ErrorMessage f-errorMessage">No available concerts.</p> }
            </div>
        );
    }
}

export default App;
