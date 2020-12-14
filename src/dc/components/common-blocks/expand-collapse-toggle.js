import React,{useState} from 'react';
import style from "./expand-collapse-toggle.module.scss"
import {FaChevronUp, FaChevronDown} from "react-icons/fa";
import classNames from "classnames/bind";
let cx = classNames.bind(style);


export const ExpandCollapseToggle = ({text, expanded = false, onToggle, className}) => {
    const toggle = (e) => {
        e.preventDefault();
        if(onToggle)
            onToggle(!expanded);
    }
    let c={
        toggle:true
    }
    c[className]=true
    let classNames=cx(c)
    return (
        <a href={"#"} className={classNames} onClick={toggle}>{text}{expanded?<FaChevronUp/>:<FaChevronDown/>}</a>
    );
}


export const ExpandCollapseToggleV2 = ({customClassName, expandedText, collapsedText, expanded = false, onToggle, expandedSymbol, collapsedSymbol}) => {
    const toggle = (e) => {
        e.preventDefault();
        if(onToggle)
            onToggle(!expanded);
    }

    let classes={
        toggle:true,
        [customClassName]:(customClassName!==undefined)     //if customClassname is defined - append it to CSS
    }

    let classNames=cx(classes)

    //if expandedSymbol/collapsedSymbol are defined - use them, otherwise use default icons
    if(!expandedSymbol)
        expandedSymbol=<FaChevronUp/>;
    if(!collapsedSymbol)
        collapsedSymbol=<FaChevronDown/>;

    if(expanded){
        return (<a href={"#"} className={classNames} onClick={toggle}>{expandedText}{expandedSymbol}</a>);
    }else{
        return (<a href={"#"} className={classNames} onClick={toggle}>{collapsedText}{collapsedSymbol}</a>);
    }
}