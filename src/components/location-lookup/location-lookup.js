import React from 'react'
import {Overlay, Popover, ListGroup, Form} from 'react-bootstrap'
import './location-lookup.scss'
export const LOCATION_SOURCE={
    AIRPORTS:'airports',
    CITIES:'cities'
}

export default class LocationLookup extends React.Component {
    constructor(props) {
        super(props);
        this.locationsSource = this.props.locationsSource;

        this.state = {
            value: '',
            target: undefined,
            matchingLocations: [],
            selectedLocation: this.props.initialLocation
        };
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
        this.handleLocationSelected = this.handleLocationSelected.bind(this);
    }

    handleLocationSelected(event, location) {
        console.debug('Selected location', location);
        this.setState({selectedLocation: location,matchingAirports: []});
        this.props.onLocationSelected(location)
    }
    isLocationSelected() {
        return this.state.selectedLocation !== undefined
    }

    getSelectedLocation() {
        return this.state.selectedLocation
    }

    clearSelectedLocation() {
        this.setState({selectedLocation: undefined});
        this.props.onLocationSelected(undefined)
    }

    handleInputValueChange(event) {
        const enteredText = event.target.value;
        this.setState({value: enteredText, target: event.target});
        // unset only if exact location was already set (to prevent unnecessary event triggering)
        if (this.isLocationSelected()) {
            this.clearSelectedLocation()
        }
        if (enteredText.length > 2) {
            let request = {
                type: this.locationsSource,
                query: enteredText
            }
            console.debug('Lookup request:',request)
            let me=this;
            fetch('/api/lookup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(request)

            })
                .then((resp) => resp.json())
                .then(function (data) {
                    let results = data.results;
                    me.setState({matchingAirports: results})
                })
                .catch(function (error) {
                    console.error('Lookup request failed', error);
                });
        }


    }

    render() {
        const matchingAirports  =  this.state.matchingAirports || [];
        let value = this.state.value;
        if (this.isLocationSelected()) {
            // if an airport was selected, overwrite text entered by user with full airport name
            value = this.getSelectedLocation().primary
        }

        return (
            <div className="location-lookup">
                <Form.Control
                    type="text"
                    value={value}
                    onChange={this.handleInputValueChange}
                    className="location-lookup__input">
                </Form.Control>
                <Overlay
                    show={matchingAirports.length > 0}
                    target={this.state.target}
                    placement="bottom">
                    <Popover id="popover-contained" className="location-lookup__popover">
                        <Popover.Content className="location-lookup__popover-content">
                            <LocationsList locations={matchingAirports} onLocationSelected={this.handleLocationSelected}/>
                        </Popover.Content>
                    </Popover>
                </Overlay>
            </div>
        )
    }



}


const LocationsList = ({locations, onLocationSelected}) =>{
    let key = 0;
    return (<ListGroup variant="flush" className="location-lookup__listgroup">
        {locations.map(location=>{
            return (<ListGroup.Item
                action className="location-lookup__listgroup-item" key={key++}
                onClick={event => onLocationSelected(event, location)}>
                <Location primaryText={location.primary} secondaryText={location.secondary}/>
            </ListGroup.Item>)
        })}
    </ListGroup>)
}

const Location = ({primaryText,secondaryText}) =>{
    return (<>
        <div className="location-lookup__listgroup-item--primary">{primaryText}</div>
        <div className="location-lookup__listgroup-item--secondary">{secondaryText}</div>
    </>)
}