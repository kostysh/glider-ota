import React from 'react';
import {
  action
} from '@storybook/addon-actions';

import {Offer,Itinerary} from "./flights-offer"


export default {
  title: 'Flights/search results/single offer',
  component: Offer,
};

const itinerary1 = {
  "itinId": "FL9",
  "segments": [
    {
      "operator": {
        "operatorType": "airline",
        "iataCode": "AF",
        "airline_name": "Air France"
      },
      "origin": {
        "locationType": "airport",
        "iataCode": "JFK"
      },
      "departureTime": "2020-07-14T17:50:00.000Z",
      "destination": {
        "locationType": "airport",
        "iataCode": "ORY"
      },
      "arrivalTime": "2020-07-15T07:30:00.000Z"
    },
    {
      "operator": {
        "operatorType": "airline",
        "iataCode": "AF",
        "airline_name": "Air France"
      },
      "origin": {
        "locationType": "airport",
        "iataCode": "CDG"
      },
      "departureTime": "2020-07-15T15:35:00.000Z",
      "destination": {
        "locationType": "airport",
        "iataCode": "HKG"
      },
      "arrivalTime": "2020-07-16T09:35:00.000Z"
    }
  ]
}

const itinerary2 = {
  "itinId": "FL19",
  "segments": [
    {
      "operator": {
        "operatorType": "airline",
        "iataCode": "AF",
        "airline_name": "Air France"
      },
      "origin": {
        "locationType": "airport",
        "iataCode": "HKG"
      },
      "departureTime": "2020-07-21T20:50:00.000Z",
      "destination": {
        "locationType": "airport",
        "iataCode": "CDG"
      },
      "arrivalTime": "2020-07-22T03:55:00.000Z"
    },
    {
      "operator": {
        "operatorType": "airline",
        "iataCode": "KL",
        "airline_name": "Air France KLM"
      },
      "origin": {
        "locationType": "airport",
        "iataCode": "CDG",
      },
      "departureTime": "2020-07-22T06:40:00.000Z",
      "destination": {
        "locationType": "airport",
        "iataCode": "AMS"
      },
      "arrivalTime": "2020-07-22T08:00:00.000Z"
    },
    {
      "operator": {
        "operatorType": "airline",
        "iataCode": "XX",
        "airline_name": "Some missing airline"
      },
      "origin": {
        "locationType": "airport",
        "iataCode": "AMS"
      },
      "departureTime": "2020-07-22T16:00:00.000Z",
      "destination": {
        "locationType": "airport",
        "iataCode": "JFK"
      },
      "arrivalTime": "2020-07-22T18:26:00.000Z"
    }
  ]
}


const price = {
  "currency": "EUR",
      "public": "1410.77",
      "commission": "8.21",
      "taxes": "589.77"
}

export const SingleItineraryExample = () => (<Itinerary itinerary={itinerary1}/>);
export const TwoItinsExample = () => (<><Itinerary itinerary={itinerary1}/><Itinerary itinerary={itinerary2}/></>);
export const EntireOffer = () => (<Offer itineraries={[itinerary1,itinerary2]} offerId="offer1" price={price} onOfferDisplay={action("onOfferDisplay")}/> );
