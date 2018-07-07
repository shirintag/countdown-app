import React, { Component } from 'react';

class Countdown extends Component {
    constructor(props) {
        super(props);
        const countdown = this.calculateCountdownTime(props.concertDateTime);
        this.state = {
            concertDateTime: props.concertDateTime,
            days: countdown.days,
            hours: countdown.hours,
            minutes: countdown.minutes,
            seconds: countdown.seconds
        };

    }

    calculateCountdownTime(concertDateTime) {
        const now = new Date();
        const totalSeconds = (concertDateTime - now) / 1000;
        const days = Math.floor(totalSeconds / (60*60*24));
        let remainingSeconds = totalSeconds % (60*60*24);
        const hours = Math.floor(remainingSeconds / (60*60));
        remainingSeconds = remainingSeconds % (60*60);
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = Math.floor(remainingSeconds % 60);
        return {days, hours, minutes, seconds};
    }


    render() {
        return (
            <div>
                <div className="Countdown">
                    <span>{this.state.days}</span>
                    <span>{this.state.hours}</span>
                    <span>{this.state.minutes}</span>
                    <span>{this.state.seconds}</span>
                </div>
            </div>
        );
    }
}

export default Countdown;
