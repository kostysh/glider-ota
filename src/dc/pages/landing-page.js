import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import SearchModeSelector from '../components/search-form/search-mode-selector';
import FlightsShoppingComponent from '../components/flight-shopping/flights-shopping-component';
import HotelsShoppingComponent from '../components/hotel-shopping/hotels-shopping-component';
import { SEARCH_TYPE } from '../components/search-form/search-mode-selector';
import DevConLayout from '../components/layout/devcon-layout';
import { parseUrlParams } from '../../utils/url-utils';
import { LandingExplainer } from '../components/landing-explainer/landing-explainer';

import { venueConfig } from '../components/venue-context/theme-context';
import { storageKeys } from '../../config/default';

export default function DCLandingPage() {
    const match = useRouteMatch();
    const searchParams = parseUrlParams(useLocation().search);
    console.log('###', searchParams);

    const searchType = match.path === '/dc/flights'
        ? SEARCH_TYPE.FLIGHTS
        : match.path === '/dc/hotels'
            ? SEARCH_TYPE.HOTELS
            : SEARCH_TYPE.FLIGHTS;

    let initialSearchOrigin;
    let initialSearchDestination;
    let initialSearchAdults;
    let initialSearchChildren;
    let initialSearchInfants;
    let initialSearchDepartureDate;
    let initialSearchReturnDate;
    let initialDoSearch;

    if (Object.keys(searchParams).length > 0) {
        try {
            switch (match.path) {
                case '/dc/flights':
                    if (searchParams[storageKeys.flights.origin]) {
                        initialSearchOrigin = JSON.parse(searchParams[storageKeys.flights.origin]);
                    }
                    if (searchParams[storageKeys.flights.destination]) {
                        initialSearchDestination = JSON.parse(searchParams[storageKeys.flights.destination]);
                    }
                    break;
                case '/dc/hotels':
                    if (searchParams[storageKeys.hotels.destination]) {
                        initialSearchDestination = JSON.parse(searchParams[storageKeys.hotels.destination]);
                    }
                    break;
                default:
            }

            if (searchParams[storageKeys.common.adults]) {
                initialSearchAdults = Number(searchParams[storageKeys.common.adults]);
            }
            if (searchParams[storageKeys.common.children]) {
                initialSearchChildren = Number(searchParams[storageKeys.common.children]);
            }
            if (searchParams[storageKeys.common.infants]) {
                initialSearchInfants = Number(searchParams[storageKeys.common.infants]);
            }
            if (searchParams[storageKeys.common.departureDate]) {
                initialSearchDepartureDate = new Date(searchParams[storageKeys.common.departureDate]);
            }
            if (searchParams[storageKeys.common.returnDate]) {
                initialSearchReturnDate = new Date(searchParams[storageKeys.common.returnDate]);
            }

            initialDoSearch = searchParams.doSearch;
        } catch (e) {
            console.log(e);
        }
    }

    if (searchType === SEARCH_TYPE.FLIGHTS) {
        initialSearchOrigin = initialSearchOrigin ? initialSearchOrigin : venueConfig.originAirport;
        initialSearchDestination = initialSearchDestination ? initialSearchDestination : venueConfig.destinationAirport;
    }
    if (searchType === SEARCH_TYPE.HOTELS) {
        initialSearchDestination = initialSearchDestination ? initialSearchDestination : venueConfig.destinationCity;
    }
    initialSearchDepartureDate = initialSearchDepartureDate ? initialSearchDepartureDate : venueConfig.startDate ? venueConfig.startDate : null;
    initialSearchReturnDate = initialSearchReturnDate ? initialSearchReturnDate : venueConfig.endDate ? venueConfig.endDate : null;
    initialSearchAdults = initialSearchAdults ? initialSearchAdults : 1;
    initialSearchChildren = initialSearchChildren ? initialSearchChildren : 0;
    initialSearchInfants = initialSearchInfants ? initialSearchInfants : 0;

    console.log('+++ Origin', initialSearchOrigin);
    console.log('+++ Dest', initialSearchDestination);

    return (
        <DevConLayout>
            <SearchModeSelector />
            {searchType === SEARCH_TYPE.FLIGHTS &&
                <FlightsShoppingComponent
                    key={Math.random()}
                    initSearch={initialDoSearch}
                    initOrigin={initialSearchOrigin}
                    initDest={initialSearchDestination}
                    initDepartureDate={initialSearchDepartureDate}
                    initReturnDate={initialSearchReturnDate}
                    initAdults={initialSearchAdults}
                    initChildren={initialSearchChildren}
                    initInfants={initialSearchInfants}
                />
            }
            {searchType === SEARCH_TYPE.HOTELS &&
                <HotelsShoppingComponent
                    key={Math.random()}
                    initSearch={initialDoSearch}
                    initDest={initialSearchDestination}
                    initDepartureDate={initialSearchDepartureDate}
                    initReturnDate={initialSearchReturnDate}
                    initAdults={initialSearchAdults}
                    initChildren={initialSearchChildren}
                    initInfants={initialSearchInfants}
                />
            }
            <LandingExplainer/>
        </DevConLayout>
    );
}
