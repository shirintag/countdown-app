import React, { Component } from 'react';
import Countdown from './Countdown';
import './sass/bundle.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            concertDateTime: null,
            loadingData: true,
        }

        this._fetchData = this._fetchData.bind(this);
    }

    _fetchData() {
        fetch('./data/concertData.json').then(response => response.json()).then(json => {
            this.setState({
                concertDateTime: new Date(json.concertTimestamp),
                loadingData: false
            });
        }).catch(error => {
            console.log(error.response ? error.response : error);
            this.setState({
                loadingData: false,
                noData: true
            });
        });
    }

    componentDidMount() {
        this._fetchData();
    }


    render() {
        let content = null;

        if (this.state.concertDateTime) {
            content = (
                <div>
                    <div className="CountdownTitle f-headline"> Next online live concert in </div>
                    <Countdown concertDateTime={this.state.concertDateTime}/>
                </div>
            );
        } else {
            content = <p className="ErrorMessage f-info">No available concerts.</p>;
        }

        return (
            <div className="ContentContainers">
                {this.state.loadingData && <div className="f-info"> Searching for concerts</div>}
                {content}
            </div>
        );
    }
}

export default App;
