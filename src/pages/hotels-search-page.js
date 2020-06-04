import React, {useState,useEffect} from 'react';
import Header from '../components/common/header/header';
import {
    buildFlightsSearchCriteria,
    searchForHotels,
    HotelsSearchForm
} from '../components/search-form/search-form';
import {parse,isValid} from "date-fns";
import {useHistory} from "react-router-dom";
import cssdefs from './flights-search-page.scss'
import Spinner from "../components/common/spinner"
import {uiEvent} from "../utils/events";
import {parseUrl}  from 'query-string';
import HotelsSearchResults from "../components/hotelresults/hotels-search-results";
import HotelFilters from "../components/filters/hotel-filters";
import {Col, Row} from "react-bootstrap";

const SEARCH_STATE={
    NOT_STARTED:'NOT_STARTED',
    IN_PROGRESS:'IN_PROGRESS',
    FAILED:'FAILED',
    FINISHED:'FINISHED'
}

export default function HotelsSearchPage({match,location, results}) {
    let history = useHistory();
    const [searchState, setSearchState] = useState(SEARCH_STATE.NOT_STARTED);
    const [searchResults, setSearchResults] = useState(results);
    const [filters, setFilters] = useState({});

    const onSearchButtonClick = (criteria) => {
        onSearchStart();
        searchForHotels(criteria)
            .then(results=>{
                uiEvent("/hotelresults, search completed");
                onSearchSuccess(results)})
            .catch(err=>{
                uiEvent("/hotelresults, search failed", err);
                onSearchFailure(err)})
    };
    const onSearchSuccess = (results) => {
        setFilters({});
        setSearchResults(results);
        setSearchState(SEARCH_STATE.FINISHED);
    }
    const onSearchFailure = (err) => {
        setFilters({});
        setSearchResults(undefined);
        setSearchState(SEARCH_STATE.FAILED);
    }
    const onSearchStart = () => {
        setSearchState(SEARCH_STATE.IN_PROGRESS);
    }

    const initialParameters = parseDeeplinkParams(location);
    const deeplinkAction = initialParameters.action;


    useEffect(()=>{
        if(deeplinkAction === 'search'){
            console.log("Deeplink search",initialParameters)
            onSearchButtonClick(initialParameters);
        }
    },[]);




    const onHotelSelected = (hotel) => {
        let url = createOfferURL(hotel.accommodationId);
        history.push(url);
    };
    let key = '';
    if(searchResults && searchResults.metadata && searchResults.metadata.uuid)
        key=searchResults.metadata.uuid;
    console.debug("Render hotel results")


    return (
        <div>
            <Header violet={true}/>
            <div className='root-container-searchpage'>
                <Row>
                    <Col xs={0} lg={3} xl={2} className='d-none d-lg-block'>
                            <HotelFilters key={key} searchResults={searchResults} onFiltersChanged={setFilters}/>
                    </Col>
                    <Col xs={12} lg={9} xl={10}>
                        <HotelsSearchForm
                            onSearchButtonClick={onSearchButtonClick}
                            initAdults={initialParameters.adults}
                            initChildren={initialParameters.children}
                            initInfants={initialParameters.infants}
                            initiDest={initialParameters.destination}
                            initOrigin={initialParameters.origin}
                            initDepartureDate={initialParameters.departureDate}
                            initReturnDate={initialParameters.returnDate}
                        />
                        <Spinner enabled={searchState === SEARCH_STATE.IN_PROGRESS}/>
                        {searchState === SEARCH_STATE.FAILED && <SearchFailed/>}
                        {searchResults != undefined &&
                        <HotelsSearchResults onHotelSelected={onHotelSelected} searchResults={searchResults} filters={filters}/>}
                    </Col>
                </Row>
            </div>
        </div>
    )
}



const SearchFailed = ()=>{
    return (
        <div className='glider-font-h1-fg pt-3'>No hotels found</div>
    )
}

function createOfferURL(accommodationId){
    const url = "/hotel/"+accommodationId;
    return url;
}




const parseDeeplinkParams = (location) =>{
    let parsedUrl=parseUrl(location.search);
    let params = parsedUrl.query;
    let dptr =  parse(params.departureDate,'yyyyMMdd',new Date());
    let ret =  parse(params.returnDate,'yyyyMMdd',new Date());
    return {
        origin: parseJSONWithDefault(params.origin,''),
        destination: parseJSONWithDefault(params.destination,''),
        departureDate: isValid(dptr)?dptr:undefined,
        returnDate: isValid(ret)?ret:undefined,
        adults: parseInt(params.adults)||1,
        children: parseInt(params.children)||0,
        infants:  parseInt(params.infants)||0,
        action:params.action
    }
}


function parseJSONWithDefault(obj,defaultValue){
    try{
        return JSON.parse(obj)
    }catch{
        return defaultValue;
    }
}
