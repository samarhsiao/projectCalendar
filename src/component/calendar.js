import '../styles/calendar.css';
import { useState, useEffect } from 'react';
import { tz } from '../utils/date';
import DayItem from './dayItem'
const Calendar = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [dateObject, setDateObject] = useState({
        currentYear: tz().format("YYYY"),
        currentMonth: tz().format("M"),
        weekList: null,
        daysOfLastMonth: 0,
        daysOfNextMonth: 0
    });
    const [isActiveDate, setIsActiveDate] = useState([]);
    
    useEffect(() => {
        const firstDay = tz().startOf("month");
        const lastDay = tz().endOf("month");
        let daysOfMonth = tz().daysInMonth() 
        let wholeMonth = Array.from({ length: daysOfMonth }, (v, i) => i + 1);
        const dayOfFirstDay = firstDay.get("day");
        const dayOfLastDay = lastDay.get("day");
        const dateOfLastMonth = tz(firstDay).subtract(dayOfFirstDay, 'day').get("date");
        const restDatesOfLastMonth = Array.from({ length: dayOfFirstDay }, (v, i) => i + dateOfLastMonth);
        const datesOfNextMonth = Array.from({ length: (6 - dayOfLastDay) }, (v, i) => i + v);
        const updatedDates = restDatesOfLastMonth.concat(wholeMonth).concat(datesOfNextMonth);
        setDateObject((oldVal) => ({
            ...oldVal,
            weekList: updatedDates,
            daysOfLastMonth: dayOfFirstDay,
            daysOfNextMonth: 6 - dayOfLastDay
        }));
    }, []);


    return (
        <div >
            <div className="calendar">
                <div className="header"> <div className="monthPicker"><i className="fa-solid fa-angle-left"></i></div><span>{`${dateObject.currentYear}年${dateObject.currentMonth}月`}</span>  <div className="monthPicker"><i className="fa-solid fa-angle-right"></i></div></div>
                <table className="timeTable">
                    <tbody>
                        <tr>{weekdays.map((v, i) => <td key={i}><span>{v}</span></td>)}</tr>
                        {dateObject.weekList && [...Array(5)].map((v, i) =>
                            <tr key={i} weekindex={i}>
                                {dateObject.weekList.slice(i * 7, 7 * (i + 1)).map((day, index) => <DayItem key={index} index={index} weekindex={i} day={day} daysOfLastMon={dateObject.daysOfLastMonth} isActiveDate={isActiveDate} setIsActiveDate={setIsActiveDate}/>)}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;
