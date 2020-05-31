import React, {useState} from 'react';
import style from "./selection-filter.module.scss"
import {Form} from "react-bootstrap";

export function SelectionFilter({id, title = 'title', filterItems, onItemCheckStateChange, onFilterStateChanged, firstItemMutuallyExclusive}) {
    const [items, setItems] = useState(filterItems)
    function onChange(itemIdx, item, checked) {
        let newItems = Object.assign([],items);
        newItems[itemIdx].selected=checked;
        if(firstItemMutuallyExclusive) {
            if(itemIdx === 0){
                //first items was checked(unchecked), uncheck(check) remaining items
                for(let idx=1;idx<newItems.length;idx++)
                    newItems[idx].selected=!checked;
            }else{
                //if any of remaining item was checked, uncheck(check) first item
                if(checked)
                    newItems[0].selected=false;
            }
        }
        setItems(newItems);
        if(onItemCheckStateChange)
            onItemCheckStateChange(itemIdx, item, checked)
        if(onFilterStateChanged)
            onFilterStateChanged(newItems);
    }


    let checkboxes = [];
    for(let idx=0;idx<items.length;idx++){
        let item = items[idx];
        checkboxes.push(<span key={item.key}>
                            <Form.Check
                                    id={item.key}
                                    className={style.filterCheckbox}
                                    checked={item.selected===true}
                                    label={item.display + " " + item.selected}
                                    onChange={(event) => onChange(idx, item, event.target.checked)} /></span>)
    }
    return (
        <div className={style.filter} key={id}>
            <div className={style.filterTitle}>{title}</div>
            <div className={style.filterContainer}>
                {checkboxes}
            </div>
        </div>
    )
}

