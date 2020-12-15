import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import style from './date-range-pickup.module.scss'
import {format, addDays} from "date-fns";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./react-datepicker.scss";
import {CustomCalendarContainer} from "./calendar-container"

export default function DateRangePickup({
                                             initialStart,
                                             initialEnd,
                                             onStartDateChanged,
                                             onEndDateChanged,
                                             startPlaceholder = 'Departure',
                                             endPlaceholder = 'Return',
                                             label,
                                             localstorageKey
                                         }) {
    const [startDate, setStartDate] = useState(initialStart);
    const [endDate, setEndDate] = useState(initialEnd);
    const onChange = dates => {
        const [start, end] = dates;

        setStartDate(start);
        onStartDateChanged(start);

        if (start && !end) {
            setEndDate(addDays(start, 1))
        } else {
            setEndDate(end);
            onEndDateChanged(end);
        }
    };

    const inputElem = (<CustomInput endDate={endDate} startDate={startDate} placeholderText="Select dates"/>)

    return (
        <>
            {label && <div className={style.label}>{label}</div>}
        <DatePicker
            placeholderText="Select dates"
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            minDate={new Date()}
            monthsShown={2}
            customInput={inputElem}
            calendarContainer={CustomCalendarContainer}
            selectsRange
        />
        </>
    );
};


const CustomInput = ({value, onClick, startDate, endDate, placeholderText}) => {
    let dates = [];
    if(startDate)
        dates.push(formatDate(startDate));
    if(endDate)
        dates.push(formatDate(endDate));

    let textToDisplay='';
    if(dates.length === 2)
        textToDisplay=dates.join(' | ');
    else
        textToDisplay=dates[0];
    return (
        <>
            <Form.Control
                type="text"
                placeholder={placeholderText}
                onFocus={onClick}
                value={textToDisplay}
                className={style.inputField}
            />
        </>
    )
};

const formatDate = (date) => {
    if(!date)
        return '';
    try{
        return format(date, 'MMM dd, EEE');
    }catch(err){
        console.warn(`Cannot format date in travel date picker, date: ${date}, error:${err}`);
    }
    return '';
}
