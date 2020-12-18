import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import SearchModeSelector from "../components/search-form/search-mode-selector";
import FlightsShoppingComponent from "../components/flight-shopping/flights-shopping-component"
import HotelsShoppingComponent from "../components/hotel-shopping/hotels-shopping-component"
import {SEARCH_TYPE} from "../components/search-form/search-mode-selector"
import DevConLayout from "../components/layout/devcon-layout"

export default function DCLandingPage() {
    const history = useHistory();
    const [searchType, setSearchType] = useState(SEARCH_TYPE.FLIGHTS);
    const [searchCity, setSearchCity] = useState();
    const [searchDateId, setSearchDateIn] = useState();
    const [searchDateOut, setSearchDateOut] = useState();
    const [searchPassengersCounts, setSearchPassengersCounts] = useState();

    useEffect(() => {
        const stopListen = history.listen(() => {
            if (history.location && history.location.state) {
                const {
                    searchType,
                    city,
                    dateIn,
                    dateOut,
                    passengersCounts
                } = history.location && history.location.state;
                setSearchType(searchType);
                setSearchCity(city);
                setSearchDateIn(dateIn);
                setSearchDateOut(dateOut);
                setSearchPassengersCounts(passengersCounts);
            }
        });
        return () => stopListen();
    });
    return (<DevConLayout>
        <SearchModeSelector selectedMode={searchType} onToggle={setSearchType}/>
        {searchType === SEARCH_TYPE.FLIGHTS && (
            <FlightsShoppingComponent
                initDest={searchCity}
                initDepartureDate={searchDateId}
                initReturnDate={searchDateOut}
            />
        )}
        {searchType === SEARCH_TYPE.HOTELS && (
            <HotelsShoppingComponent
                initDest={searchCity}
                initDepartureDate={searchDateId}
                initReturnDate={searchDateOut}
                initAdults={searchPassengersCounts.adults}
                initChildren={searchPassengersCounts.children}
                initInfants={searchPassengersCounts.infants}
            />
        )}
    </DevConLayout>)
}
