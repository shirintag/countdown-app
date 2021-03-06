import React, { Component } from 'react';

class Countdown extends Component {
    constructor(props) {
        super(props);
        const countdown = this.calculateCountdownTime(props.concertDateTime);
        this.state = {
            concertDateTime: props.concertDateTime,
            totalSeconds: countdown.totalSeconds,
            days: countdown.days,
            hours: countdown.hours,
            minutes: countdown.minutes,
            seconds: countdown.seconds,
            live: countdown.totalSeconds <= 0
        };

        this.updateCountdownTime = this.updateCountdownTime.bind(this);
    }

    calculateCountdownTime(concertDateTime, now) {
        now = now || new Date();
        const totalSeconds = (concertDateTime - now) / 1000;
        const days = Math.floor(totalSeconds / 86400);
        let remainingSeconds = totalSeconds % 86400;
        const hours = Math.floor(remainingSeconds / 3600);
        remainingSeconds = remainingSeconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = Math.floor(remainingSeconds % 60);
        return {totalSeconds, days, hours, minutes, seconds};
    }

    updateCountdownTime() {
        const countdown = this.calculateCountdownTime(this.props.concertDateTime);
        if (countdown.totalSeconds <= 0) {
            this.setState({live: true});
            clearInterval(this.interval);
        } else {
            this.setState(countdown);
        }
    }

    componentDidMount() {
        this.interval = setInterval(this.updateCountdownTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let content;
        if (!this.state.live) {
            const countdownTitle = <div className="CountdownTitle f-headline">Next online live concert in</div>
            const countdown = (
                <div className="Countdown">
                    <div className="Countdown-box">
                        <span className="Countdown-box-value f-time">{this.state.days}</span>
                        <span className="Countdown-box-label f-label">Days</span>
                    </div>
                    <div className="Countdown-box">
                        <span className="Countdown-box-value f-time">{this.state.hours}</span>
                        <span className="Countdown-box-label f-label">hrs.</span>
                    </div>
                    <div className="Countdown-box">
                        <span className="Countdown-box-value f-time">{this.state.minutes}</span>
                        <span className="Countdown-box-label f-label">min.</span>
                    </div>
                    <div className="Countdown-box">
                        <span className="Countdown-box-value f-time">{this.state.seconds}</span>
                        <span className="Countdown-box-label f-label">sec.</span>
                    </div>
                </div>
            )
            content = [ countdownTitle, countdown ]
        } else {
            content = <div className="f-headline">Now Live</div>
        }
        return content;
    }
}

export default Countdown;
