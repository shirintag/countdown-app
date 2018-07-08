import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from './Countdown';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Countdown concertDateTime={new Date()}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('test calculateCountdownTime', () => {
    var now = new Date(2018, 7, 7);
    var concertDate = new Date(2018, 7, 8, 12, 30, 30);
    it('test that calculation works correctly', () => {
        var countdown = Countdown.prototype.calculateCountdownTime(concertDate, now);
        expect(countdown.days).toBe(1)
        expect(countdown.hours).toBe(12)
        expect(countdown.minutes).toBe(30)
        expect(countdown.seconds).toBe(30)
    })
});
