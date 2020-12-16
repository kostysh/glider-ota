import React, {useEffect, useState} from 'react'
import LookupField from "./components/lookup-field";
import {fetchGet} from "../../../utils/api-utils";

export function AirportLookup({initialLocation, onSelectedLocationChange, placeHolder, label, localstorageKey}) {
    const [searchResults, setSearchResults] = useState([]);
    const [defaultLocation, setDefaultLocation] = useState();

    async function onQueryEntered(searchQuery) {
        let results = fetchGet('/api/lookup/airportSearch2', {searchquery: searchQuery});
        results.then((response) => {
            let airports = convertResponse(response.results);
            setSearchResults(airports);
        }).catch(err => {
            console.error("Failed to search for airports", err)
        })
    }
    useEffect(()=>{
        //if initial location is set - it will be iata code and it needs to be resolved into airport name/city/country
        if(initialLocation){
            let results = fetchGet('/api/lookup/airportByIata', {iata: initialLocation});
            results.then((response) => {
                let airportRecord=response.results;
                let resolvedLocation= {
                    primary: `${airportRecord.city_name} ${airportRecord.airport_name}`,
                    secondary: airportRecord.country_code,
                    code: airportRecord.airport_iata_code,
                }
                setDefaultLocation(resolvedLocation)
            }).catch(err => {
                console.error("Failed to search for airport by iata", err)
            })
        }
    },[])

    function convertResponse(airports) {
        let lastMetropolitan;
        return airports.map(rec => {
            let icon,primaryName, secondaryName, code, indent=false;

            if(rec.type === 'AIRPORT')
                icon='airport'
            if(lastMetropolitan && lastMetropolitan.city_code === rec.city_code){
                indent=true;
            }
            if(rec.type === 'METROPOLITAN'){
                primaryName=rec.city_name
            }else{
                primaryName=rec.city_name + " " + rec.airport_name;
            }
            secondaryName=rec.country_code;
            if(rec.type === 'METROPOLITAN'){
                lastMetropolitan=rec;
            }
            return {
                primary: primaryName,
                secondary: secondaryName,
                code: rec.airport_iata_code,
                indent: indent,
                icon:icon
            }
        })
    }
    return (
        <LookupField initialLocation={defaultLocation} onSelectedLocationChange={onSelectedLocationChange}
                     placeHolder={placeHolder} onQueryEntered={onQueryEntered} locations={searchResults} label={label} localstorageKey={localstorageKey}/>
    )
}


