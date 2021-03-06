const {createLogger} = require('./logger');
const {getAirportByIataCode,getAirlineByIataCode} = require ('./dictionary-data-cache')
const _ = require('lodash');
const {v4} = require('uuid');
const { utcToZonedTime} = require('date-fns-tz');
const logger = createLogger('response-decorator-logger');


function enrichResponseWithDictionaryData(searchCriteria, results){
    enrichAirportCodesWithAirportDetails(results);
    enrichOperatingCarrierWithAirlineNames(results);
    convertUTCtoLocalAirportTime(results);
    increaseOfferPriceWithStripeCommission(results);

    //hotel search results & hotel offers do not have check in/out DATE (only time)
    //we need that (e.g. to display accommodation info in shopping cart) - thus here we need to decorate it (based on search dates)
    addSearchCriteriaToOffers(results, searchCriteria);
    results['metadata']={
        uuid:v4(),
        timestamp:new Date(),
        numberOfOffers:results.offers?Object.keys(results.offers).length:0
    }
}
function addSearchCriteriaToOffers(results, searchCriteria) {
    if(!results.accommodations || !results.offers){
        //if it's only flight search results or not offers at all - skip it
        return;
    }
    const {arrival, departure} = searchCriteria.accommodation;
    Object.keys(results.offers).forEach(offerId=>{
        const offer=results.offers[offerId];
        offer.travelDates={
            arrival:arrival,
            departure:departure
        }
    })
}

function enrichAirportCodesWithAirportDetails(results){
    let segments = _.get(results,'itineraries.segments',[])
    _.each(segments, (segment,id)=>{
        let origin = segment.origin;
        let airportCode = origin.iataCode;
        let airportDetails = getAirportByIataCode(airportCode);
        if(airportDetails!==undefined){
            origin.city_name=airportDetails.city_name;
            origin.airport_name=airportDetails.airport_name;
        }else{
            logger.warn("Airport definition not found for airport code:%s",airportCode)
        }

        let destination = segment.destination;
        airportCode = destination.iataCode;
        airportDetails = getAirportByIataCode(airportCode);
        if(airportDetails!==undefined){
            destination.city_name=airportDetails.city_name;
            destination.airport_name=airportDetails.airport_name;
        }else{
            logger.warn("Airport definition not found for airport code:%s",airportCode)
        }
    });

}


function enrichOperatingCarrierWithAirlineNames(results){
    let segments = _.get(results,'itineraries.segments',[])
    _.each(segments, (segment,id)=>{
        let operator = segment.operator;
        let airlineCode  = operator.iataCode;
        let airlineDetails = getAirlineByIataCode(airlineCode);
        //{"airline_iata_code":"AQ","airline_name":"9 Air"},{"airline_iata_code":"RL","airline_name":"Royal Flight"}
        if(airlineDetails!==undefined){
            operator.airline_name=airlineDetails.airline_name;
        }else{
            logger.warn("Airline definition not found for airline code:%s",airlineCode)
        }
    });

}

/**
 * Departure date from UI may come in a local timezone and hour may be random.
 * We should search with UTC and with hour = 12
 * @param criteria
 */
function setDepartureDatesToNoonUTC(criteria){
    let segments = _.get(criteria,'itinerary.segments',[])
    _.each(segments, (segment,id)=>{

        let d=segment.departureTime.substr(0,10).split("-");
        let utc = new Date(Date.UTC(d[0],d[1]-1,d[2]))
        utc.setUTCHours(12);
        logger.debug(`Departure date from UI:${segment.departureTime}, UTC date which will be used for search:${utc}`)
        segment.departureTime=utc;
    });
}

function convertUTCtoLocalAirportTime(results){
    let segments = _.get(results,'itineraries.segments',[])
    _.each(segments, (segment,id)=>{
        let airportData = getAirportByIataCode(segment.origin.iataCode);
        if(airportData!==undefined && airportData.timezone){
            segment.departureTimeUtc=segment.departureTime;
            segment.departureTime=utcToZonedTime(segment.departureTime,airportData.timezone).toISOString();
        }else{
            throw new Error(`Timezone definition not found for airport code:${segment.origin.iataCode}`);
        }

        airportData = getAirportByIataCode(segment.destination.iataCode);
        if(airportData!==undefined && airportData.timezone){
            segment.arrivalTimeUtc=segment.arrivalTime;
            segment.arrivalTime=utcToZonedTime(segment.arrivalTime,airportData.timezone).toISOString();
        }else{
            throw new Error(`Timezone definition not found for airport code:${segment.destination.iataCode}`);
        }
    });
}


function increaseOfferPriceWithStripeCommission(results){
    let offers = _.get(results,'offers',{})
    _.each(offers, (offer,id)=>{
        let price = offer.price;
        price.public=_roundToTwoDecimals(_addOPCFee(price.public));
    });
}


function increaseConfirmedPriceWithMaxOPCFee(repriceResponse){
    if (repriceResponse && repriceResponse.offer && repriceResponse.offer.price){
        let price = repriceResponse.offer.price;
        let priceWithoutOpcFee = Number(price.public);
        let priceWithOpcFee = _addOPCFee(price.public);
        price.public=_roundToTwoDecimals(priceWithOpcFee);
        price.publicWithoutFees=priceWithoutOpcFee;
        let diff = _roundToTwoDecimals(priceWithOpcFee-priceWithoutOpcFee);
        price.opcFee=diff;
    }
}

//add 5% on top of the total price to cover for OPC fee
//FIXME - replace hardcoded commision with configurable value
function _addOPCFee(amount){
    return Number(amount)*1.05;
}

function _roundToTwoDecimals(number){
    return Math.round( number * 100 + Number.EPSILON ) / 100
}
module.exports={
    enrichResponseWithDictionaryData,
    enrichAirportCodesWithAirportDetails,
    enrichOperatingCarrierWithAirlineNames,
    replaceUTCTimeWithLocalAirportTime: convertUTCtoLocalAirportTime,
    setDepartureDatesToNoonUTC,
    increaseConfirmedPriceWithMaxOPCFee,
}
