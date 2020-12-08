import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import style from './date-pickup.module.scss'
import {format} from "date-fns";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./react-datepicker.scss";

export default function DatePickup({initialDate,onDateChanged,placeholder = 'Departure',label,localstorageKey}) {
    const [startDate, setStartDate] = useState(initialDate);
    const onChange = date => {
        setStartDate(date);
        if(onDateChanged) {
            onDateChanged(date);
        }else{
            console.warn('onDateChanged is not defined!')
        }
    };

    const inputElem = (<CustomInput date={startDate}/>)

    return (
        <>
            {label && <div className={style.label}>{label}</div>}
        <DatePicker
            selected={startDate}
            onChange={onChange}
            minDate={new Date()}
            monthsShown={2}
            customInput={inputElem}
        />
        </>
    );
};


const CustomInput = ({value, date, onClick}) => {
    let textToDisplay='';
    if(date)
        textToDisplay = formatDate(date);

    return (
        <>
          <Form.Control type="text" placeholder="" onFocus={onClick} value={textToDisplay} className={style.inputField}/>
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
