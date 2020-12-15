import React, {useState} from 'react'
import style from './hotel-search-results.module.scss'
import {Container, Row} from 'react-bootstrap'
import _ from 'lodash'
import SingleHotel from "./single-hotel";
import HotelDetails from "../hoteldetails/hotel-details"

import {HotelSearchResultsFilterHelper} from "../../../utils/hotel-search-results-filter-helper";
import {
    hotelErrorSelector,
    hotelsFiltersSelector, isHotelSearchFormValidSelector,
    isHotelSearchInProgressSelector,
    hotelSearchCriteriaSelector, searchForHotelsAction,
    hotelSearchResultsSelector
} from "../../../redux/sagas/shopping-flow-store";
import {connect} from "react-redux";
import Spinner from "../../../components/common/spinner";
import SearchButton from "../search-form/search-button";
import ResultsPaginator, {limitSearchResultsToCurrentPage, ITEMS_PER_PAGE} from "../common/pagination/results-paginator";

export function HotelsSearchResults({searchResults, onSearchClicked, isSearchFormValid, filters, searchInProgress, error}) {
    const [currentPage, setCurrentPage] = useState(1);
    console.log('Hotel search results:',searchResults)
    const onHotelSelected = () =>{

    }
    if (searchResults === undefined) {
        return (<>No hotels found</>)
    }

    //SEARCH button was hit - search for hotels
    const onSearchButtonClicked = () => {
        if(onSearchClicked) {
            onSearchClicked();
        }else{
            console.warn('onSearchClicked is not defined!')
        }
    }


    let results=[];
    let totalResultsCount=0;
    if(searchResults) {
        const helper = new HotelSearchResultsFilterHelper(searchResults);
        results = helper.generateSearchResults(filters);
        totalResultsCount = results.length;
        results = limitSearchResultsToCurrentPage(results, currentPage);
    }

    //display search results paginator only if there are more than ITEMS_PER_PAGE results
    const displayResultsPaginator = () =>{

        if(totalResultsCount < ITEMS_PER_PAGE)
            return (<></>)

        return (
            <ResultsPaginator activePage={currentPage} recordsPerPage={ITEMS_PER_PAGE} onActivePageChange={setCurrentPage} totalRecords={totalResultsCount}/>
        )
    }


    return (
        <>
            <SearchButton disabled={!isSearchFormValid} onSearchButtonClicked={onSearchButtonClicked}/>
            <Spinner enabled={searchInProgress===true}/>
            {error && (<div>ERROR OCCURED</div>)}

            <div className='pt-3'/>
            {/*<Row className={style.hotelsSearchResultsWrapper}>*/}
                {
                    _.map(results, (result, id) => {
                        let hotel = result.hotel;
                        let bestoffer = result.bestoffer;
                        // return (<SingleHotel hotel={hotel} bestoffer={bestoffer} key={id} handleClick={onHotelSelected} searchResults={searchResults}/>)
                        return (<HotelDetails searchResults={searchResults} hotel={hotel}/>)
                    })
                }
            {/*</Row>*/}
            {displayResultsPaginator()}
        </>
    )

}



const mapStateToProps = state => ({
    filters: hotelsFiltersSelector(state),
    searchCriteria: hotelSearchCriteriaSelector(state),
    searchInProgress: isHotelSearchInProgressSelector(state),
    searchResults: hotelSearchResultsSelector(state),
    isSearchFormValid: isHotelSearchFormValidSelector(state),
    error:hotelErrorSelector(state)
});

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchClicked: () => {
            dispatch(searchForHotelsAction())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HotelsSearchResults);
