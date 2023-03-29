import React from 'react';
import Countdown from 'react-countdown';

function TimeDifference({date}) {

    function handleDateDifferenceFromNow(date) {
        const endsAt = new Date(date);
        const currentDate = new Date();
        const daysDifference = Math.floor(
            (endsAt.getTime() - currentDate.getTime()) / (24*3600*1000)
        );
        if (daysDifference > 364) {
            const yearDifference = endsAt.getFullYear() - currentDate.getFullYear();
            if (yearDifference === 1) {
                return (
                    <span>
                        {"1 year"}
                    </span>
                );
            }
            return (
                <span>
                    {yearDifference + " years"}
                </span>
            );
        }
        if (daysDifference > 30) {
            const monthDifference = endsAt.getMonth() - currentDate.getMonth();
            if (monthDifference === 1) {
                return (
                    <span>
                        {"1 month"}
                    </span>
                );
            }
            return (
                <span>
                    {monthDifference + " months"}
                </span>
            );
        }
        if (daysDifference > 1) {
            return (
                <span>
                    {daysDifference + " days"}
                </span>
            );
        }
        return (
            <Countdown 
            date={endsAt} 
            renderer={countdownRenderer}
            />
        );
    }

    function countdownRenderer({hours, minutes, seconds, completed}) {
        function handleHours(hours) {
            if (hours === 1) {
                return (hours + " hour")
            }
            return (hours + " hours");
        }
        function handleMinutes(minutes) {
            if (minutes < 10) {
                return ("0" + minutes);
            }
            return (minutes);
        }
        function handleSeconds(seconds) {
            if (seconds < 10) {
                return ("0" + seconds);
            }
            return (seconds);
        }
    
        if (completed) {
            return (
                <span className="text-danger">Expired</span>
            );
        }
        if (hours < 1) {
            return (
                <span className="text-danger">
                    {handleMinutes(minutes)}:{handleSeconds(seconds)}
                </span>
            );
        }
        return (
            <span>{handleHours(hours)}</span>
        );
    }

    return (handleDateDifferenceFromNow(date));
}

export default TimeDifference;