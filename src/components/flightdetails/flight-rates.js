import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import OfferUtils from "../../utils/offer-utils";
import style from "./flight-rates.module.scss"

export default class FlightRates extends React.Component {
    constructor(props) {
        super(props);
        const {selectedCombination, selectedOffer, pricePlans} = this.props
        this.plansManager = new PricePlansManager(selectedCombination.offers, pricePlans);
        this.state={
            selection:this.initializeState(selectedOffer.flightCombination)
        }
        this.handlePricePlanSelection = this.handlePricePlanSelection.bind(this);
    }

    initializeState(flightCombination){
        let state={}
        flightCombination.map(rec=>{
            return state[rec.flight]=rec.pricePlan;
        })
        return state;
    }

    handlePricePlanSelection(itinId, pricePlanId) {
        console.log("Price plan selected, itinID:", itinId, ", price plan:", pricePlanId)
        let state=this.state;
        state.selection[itinId]=pricePlanId;
        let newOffer = this.plansManager.findOffer(state.selection)
        if(newOffer!==undefined){
            console.log("Found new offer")
            this.props.onOfferChange(newOffer);
        }
        else {
            console.log("Offer not found")
        }
        this.setState(state);
    }


    render() {
        const {selectedCombination} = this.props;
        const itineraries = selectedCombination.itinerary;
        return (
            <>
            <div>
                <h2 className={style.ratesHeader}>Airline rates</h2>
            </div>
            <div>
                {
                    itineraries.map(itinerary=>{
                        let itinId=itinerary.itinId;
                        return (
                            <DisplayItineraryRates key={itinId} itinerary={itinerary} plansManager={this.plansManager}
                                                   onPricePlanSelected={this.handlePricePlanSelection}
                                                   selectedPlan={this.state.selection[itinId]}/>)

                    })
                }

            </div>
            </>
        )
    }
}


function DisplayItineraryRates({itinerary, plansManager, onPricePlanSelected,selectedPlan}) {
    let firstSegment=itinerary.segments[0];
    let tripOrigin = firstSegment.origin;
    let lastSegment = itinerary.segments[itinerary.segments.length - 1];
    let tripDestination = lastSegment.destination;

    let itineraryId = itinerary.itinId;
    let availablePricePlans = plansManager.getItineraryUniquePricePlans(itinerary.itinId);

    let allPricePlans = plansManager.getAllPricePlans();
    console.log("itinerary.itinId",itinerary.itinId)
    console.log("Available price plans for itinerary:",availablePricePlans)
    console.log("All price plans for itinerary:",allPricePlans)
    return (<>
        <div className={style.ratesItinRoute}>Flight {tripOrigin.city_name?tripOrigin.city_name:tripOrigin.iataCode} —> {tripDestination.city_name?tripDestination.city_name:tripDestination.iataCode}</div>
        <div className='d-flex flex-row flex-wrap'>
                {
                    availablePricePlans.map((pricePlanId) => {
                        console.log("price plan ID:",pricePlanId)
                        let pricePlan = allPricePlans[pricePlanId];
                        // console.log("Price plan:",pricePlan);
                        let bagsAllowance=pricePlan.checkedBaggages.quantity;
                        let allowedKilos = bagsAllowance*23;
                        let styleName = style.priceplanContainer;
                        if(selectedPlan === pricePlanId)
                            styleName = style.priceplanContainerSelected;
                        return (
                            <div className={styleName} key={pricePlanId}
                                 onClick={() => { onPricePlanSelected(itineraryId, pricePlanId)}}>
                                <div className={style.ratesPlanName}>{pricePlan.name}</div>
                                <div className={style.ratesPlanDetails}>{bagsAllowance==='0'?'No luggage':('Baggage '+allowedKilos+' kg')}</div>
                            </div>
                        )

                    })
                }
        </div>
    </>)
}




class PricePlansManager {
    constructor(offers, allPricePlans) {
        console.log("PricePlansManager constructor")
        console.log("PricePlansManager allPricePlans:",allPricePlans)
        this.pricePlanCombinations = undefined;
        this.cheapestOffer = undefined;
        this.selectedOfferId = undefined;
        this.allPricePlans = allPricePlans;
        this.selectedItinPlan = [];
        this.offers = offers;
        this.initialize(offers);
    }


    /**
     * find all possible price plans combinations for selected flights
     */
    initialize() {
        let itinPricePlans = this.offers.map(offer => {
            //for each offer, index: offerID, price and flights with associated price plans
            return {
                offerId: offer.offerId,
                flightCombination: offer.flightCombination,
                price: offer.offer.price
            }
        })
        itinPricePlans.sort((a, b) => {
            return a.price.public > b.price.public ? 1 : -1
        })
        this.cheapestOffer = itinPricePlans[0];
        const cheapestPrice = this.cheapestOffer.price.public;
        itinPricePlans.map(r => {
            r.upsellPrice = r.price.public - cheapestPrice;
            return true;
        })

        this.pricePlanCombinations = itinPricePlans;
    }


    getItineraryUniquePricePlans(itineraryId) {
        let results = []
        this.pricePlanCombinations.map(rec => {
            rec.flightCombination.map(f => {
                if (f.flight === itineraryId) {
                    if (results.indexOf(f.pricePlan) < 0)
                        results.push(f.pricePlan)
                }
            })
            return true;
        })
        return results;
    }



    getAllPricePlans() {
        return this.allPricePlans;
    }

    findOffer(itinPlans) {
        // console.log("Available offers:",this.pricePlanCombinations);
        // console.log("Selection state:",itinPlans);

        let found = this.pricePlanCombinations.find(rec=>{
            let flightCombination=rec.flightCombination;
            let allKeysMatch=true;
            flightCombination.map(combination=>{
                allKeysMatch = (allKeysMatch && (itinPlans[combination.flight]===combination.pricePlan))
            })
            return allKeysMatch;
        })
        console.log("Found:",found)
        if(found!==undefined)
            found = this.findOfferById(found.offerId);
        return found;
    }
    findOfferById(offerId){
        return this.offers.find(offer=>offer.offerId === offerId);
    }

}



function getFirstSegment (segments) {
    return segments[0];
}

function  getLastSegment (segments) {
    return ;
}