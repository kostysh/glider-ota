import React from 'react';
import FlightsSearchForm from '../components/search-form/flight-search-form'
import Filters from "../components/filters/filters";
import FlightsSearchResults from "../components/flightresults/flights-search-results";
import {Col, Row} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';

export default function FlightsShoppingComponent() {
    return (
        <div>
            <Row>
                <FlightsSearchForm/>
            </Row>
            <Row>
                <Col xs={0} sm={0} md={3} xl={0} className='d-none d-md-block'>
                    <Filters/>
                </Col>
                <Col xs={12} sm={9} md={6} xl={6}>
                    <FlightsSearchResults/>
                </Col>
                <Col xs={0} sm={3} md={3} xl={3}>
                    shopping cart
                </Col>
            </Row>

        </div>
    )
}

const WarningNoResults = () => {
    return (
        <Alert variant="warning" className={'pt-2'}>
            <Alert.Heading>
                Sorry, we could not find any flights
                <span role='img' aria-label='sorry'> 😢</span>
            </Alert.Heading>
            <p>
                There may be no flights available for the requested origin, destination and travel dates.<br/>
            </p>
            <p className="mb-0">
                We are working hard to integrate with other partners, and more options will quickly become available,
                stay tuned!
            </p>
        </Alert>
    );
};

function searchForFlightsWithCriteria() {

}



