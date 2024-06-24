import { useState, useEffect } from 'react';
import { tz } from '../utils/date';
function DayItem(props) {


    const { index, weekindex, day, daysOfLastMon, setIsActiveDate, isActiveDate } = props;
    const isLastMonth = weekindex === 0 && index < daysOfLastMon ? 'lastMonth' : '';
    const isToday = (tz().get('date') === day) && !isLastMonth ? 'today' : '';
    const [isBetween, setIsBetween] = useState(false);
    function IsD2AfterD1(d1, d2) {

        if (d2.date > d1.date) return true;
        if ((d2.date < d1.date) && (d2.weekindex === d1.weekindex || d2.weekindex > d1.weekindex)) return true;
        return false;
    }
    function handleDatePick(dayObject) {

        if (isLastMonth) return;

        const isSingleDate = isActiveDate.length === 1;

        if ( isSingleDate && !IsD2AfterD1(isActiveDate[0], dayObject)) {
            setIsActiveDate([]);
        } else if(isActiveDate.length === 2){
            setIsActiveDate(oldVal => []);
            setIsActiveDate(oldVal => [...oldVal, dayObject]);
        }
        else {
            setIsActiveDate(oldVal => [...oldVal, dayObject]);
        }
    }
    useEffect(() => {
        const isBetweenActiveDates = (isActiveDate.length === 2 &&
            ((day > isActiveDate[0]?.date && day < isActiveDate[1]?.date) || (day > isActiveDate[1]?.date && day < isActiveDate[0]?.date))) || day === isActiveDate[0]?.date || day === isActiveDate[1]?.date;
            setIsBetween(isBetweenActiveDates)
    }, [isActiveDate,day]);


    return (
        <>{console.log('isActiveDate',isActiveDate)}<td className={`${isLastMonth} ${isBetween ? 'active' : ''} ${isToday}`} onClick={() => handleDatePick({ date: day, weekindex: weekindex })}><span>{day}</span>

        </td></>
    );
}

export default DayItem;