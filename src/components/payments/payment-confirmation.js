import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Col} from "react-bootstrap";
import Spinner from "../common/spinner";
import {getOrderStatus} from "../../utils/api-utils";
import './payment-confirmation.scss';

const CONFIRMATION_STATUS={
    INITIAL:'INITIAL',
    PENDING:'PENDING',
    SUCCESS:'SUCCESS',
    FAILURE:'FAILURE',
    TOOLONG:'TOOLONG',
    CANNOT_CONFIRM:'CANNOT_CONFIRM'
}

const MAX_CONFIRMATION_WAIT_TIME_MILLIS=70000;
const RETRY_TIMEOUT_MILLIS=5000;

export default function PaymentConfirmation({orderID}) {
    const [checkStatus, setCheckStatus] = useState(CONFIRMATION_STATUS.INITIAL);
    const [error, setError] = useState();
    const [timeoutRef,setTimeoutRef] = useState();
    const [firstCheck, setFirstCheck] = useState(new Date());
    const [order, setOrder] = useState();

    // Check the order status
    function checkOrderStatus(orderIdentifier) {
        setCheckStatus(CONFIRMATION_STATUS.PENDING);
        let now = new Date();
        console.log('checkOrderStatus>>', now, firstCheck, now-firstCheck);
        
        // If timeout is exceeded, stop
        if((now - firstCheck) > MAX_CONFIRMATION_WAIT_TIME_MILLIS) {
            stopCheckingInFuture();
            setCheckStatus(CONFIRMATION_STATUS.TOOLONG);
            return;
        } else {
            console.log(`Total time: ${now - firstCheck}`);
        }
        firstCheck && console.log(`Total time: ${now - firstCheck}`);

        // Otherwise status is retrieved from server
        getStatus(orderIdentifier);
    };

    function getStatus(orderIdentifier){
        getOrderStatus(orderIdentifier)
            .then(data => {
                processOrderStatus(data);
            })
            .catch(err=>{
                setError("We can not retrieve the status, please refresh your browser to retry");
                setCheckStatus(CONFIRMATION_STATUS.FAILURE);
                //checkStatusInFuture();
            });
    }

    function checkStatusInFuture(){
        let ref=setTimeout(()=>checkOrderStatus(orderID), RETRY_TIMEOUT_MILLIS);
        setTimeoutRef(ref);
    }

    function stopCheckingInFuture(){
        try{
            clearTimeout(timeoutRef);
        }catch(err){

        }
    }

    function processOrderStatus(data){
        setOrder(data);
        let orderStatus = data.order_status;
        //console.debug("processOrderStatus:", orderStatus);

        switch (orderStatus){
            case 'NEW':
                setCheckStatus(CONFIRMATION_STATUS.PENDING);
                checkStatusInFuture();
                break;
            case 'FULFILLED':
                setCheckStatus(CONFIRMATION_STATUS.SUCCESS);
                stopCheckingInFuture();
                break;
            case 'FAILED':
                setCheckStatus(CONFIRMATION_STATUS.FAILURE);
                stopCheckingInFuture();
                break;
            default:
                console.error("Unknown order status:",orderStatus)
        }
    }

    const retryCheck = ()=>{
        getStatus(orderID);
    }

    useEffect(() => {
        checkOrderStatus(orderID);
        }, []
    );


    const renderRetry = () => {
        return (
            <div className='glider-font-text24medium-fg'>
                Confirmation takes too much time.
                Please retry by clicking below button
                <Button onClick={retryCheck} size='lg' variant='primary'>Retry</Button>
            </div>
        )
    }

    const renderPleaseWait = () => {
        return (
            <div className='glider-font-text24medium-fg'>
                Please wait while we are completing your booking
                <Spinner enabled={true}></Spinner>
            </div>
        )
    }

    const renderConfirmationFailed = () => {
        return (
            <div className='glider-font-h2-fg'>
                Unfortunately we cannot confirm your booking at the moment. <br/>
            </div>
        )
    }

    const renderConfirmationSuccess = () => {
        let bookings = [];
        try{
            console.debug("Confirmation data:", order.confirmation);
            console.debug("Confirmation data - travel docs:", order.confirmation.travelDocuments);
            bookings = order.confirmation.travelDocuments.bookings;
        }catch(err){
            console.warn("Cant find travel documents in confirmation", order.confirmation)
        }

        let reservationNumber;
        try{
            console.debug("Confirmation data:", order.confirmation.order);
            reservationNumber = order.confirmation.order.reservationNumber;
        }catch(err){
            console.warn("Cant find reservation number in confirmation", order.confirmation)
        }

        return (
            <div className='glider-font-h2-fg'>
                <p>
                    Your booking is confirmed!<br/>
                    {(bookings && bookings.length>0) && <>Booking reference: <b>{bookings.join(', ')}</b></>}
                    {reservationNumber && <>Reservation number: <b>{reservationNumber}</b></>}
                </p>
                <p>Your travel documents will be send to you by email.</p>
            </div>
        )
    }

    // Render the Payment Status
    const paymentStatus = () => {
        // Determine the status
        const status = (order && order.payment_status) ? order.payment_status : 'undefined';

        // Determine the icon
        let iconStatus;
        let message;
        switch(status) {
            case 'NOT_PAID':
                iconStatus = 'pending';
                message = (
                    <small>
                        We have not yet received confirmation of your payment
                    </small>
                );
                break;
            case 'PAID':
                iconStatus = 'success';
                if(order.payment_details) {
                    const {card, receipt, status} = order.payment_details;
                    message = (
                        <small>
                            Your {card.brand} card **{card.last4} is {status.type}. <a href={receipt.url} target='_blank' rel="noopener noreferrer">(Receipt)</a>
                        </small>
                    );
                }
                break;
            case 'FAILED':
                iconStatus = 'failed';
                message = (
                    <small>
                        Your payment has been declined
                    </small>
                );
                break;
            default:
                iconStatus = 'undefined';
                message = (
                    <small>
                        The status of your payment is being retrieved from the server
                    </small>
                );
                break;
        }

        return (
            <div className='col-status'>
                <div className={`icon-status-${iconStatus}`} aria-label={status}/>
                <div className='message-status'>{message}</div>
            </div>
        );
    };

    // Render the Booking Status
    const bookingStatus = () => {
        const status = (order && order.order_status) ? order.order_status : 'undefined';
        let iconStatus;
        let message;
        switch(status) {
            case 'NEW':
                iconStatus = 'pending';
                if(order.payment_status !== 'PAID') {
                    message = (
                        <small>
                            We will process your booking once the payment is confirmed
                        </small>
                    );
                }

                else {
                    message = (
                        <small>
                            We are confirming your booking with the travel supplier.
                        </small>
                    );
                }

                break;
            case 'FULFILLED':
                iconStatus = 'success';
                if(
                    order.confirmation &&
                    order.confirmation.travelDocuments
                ) {
                    const {bookings, etickets} = order.confirmation.travelDocuments;
                    message = (
                        <small>
                            Your booking reference{bookings.length > 1 ? 's are' : ' is'}: {bookings.join(', ')}
                            <br/>
                            Your e-ticket{bookings.length > 1 ? 's are' : ' is'}: {(etickets).map(tkt => Object.keys(tkt)[0]).join(', ')}
                        </small>
                    );
                }else if(
                    order.confirmation &&
                    order.confirmation.order &&
                    order.confirmation.order.reservationNumber
                ) {
                    const reservationNumber = order.confirmation.order.reservationNumber;
                    message = (
                        <small>
                            Your booking reference is: {reservationNumber}
                        </small>
                    );
                }

                break;
            case 'FAILED':
                iconStatus = 'failed';
                message = (
                    <small>
                        We could not confirm your booking immediatly with the travel supplier, sorry!
                        We are going to retry a bit later and send your confirmation by email. In case we can not create your booking within 24h, we will cancel your payment automatically.
                    </small>
                );
                break;
            default:
                iconStatus = 'undefined';
                message = (
                    <small>
                        The status of your booking is being retrieved from the server
                    </small>
                );
                break;
        }

        return (
            <div className='col-status'>
                <div className={`icon-status-${iconStatus}`} aria-label={status}/>
                <div className='message-status'>{message}</div>
            </div>
        );
    };

    return (
        <Container >
            <Row >
                <Col className='pb-5'>
                    <h1>Booking confirmation </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                {checkStatus === CONFIRMATION_STATUS.PENDING && renderPleaseWait()}
                {checkStatus === CONFIRMATION_STATUS.FAILURE && renderConfirmationFailed()}
                {checkStatus === CONFIRMATION_STATUS.SUCCESS && renderConfirmationSuccess()}
                {checkStatus === CONFIRMATION_STATUS.TOOLONG && renderRetry()}
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={3} className='col-category'>
                    <span>Payment</span>
                </Col>
                <Col xs={12} md={9}>
                    {paymentStatus()}
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={3} className='col-category'>
                    <span>Booking</span>
                </Col>
                <Col xs={12} md={9}>
                    {bookingStatus()}
                </Col>
            </Row>
            <Row>
                <Col >
                    <small>
                    {error}
                    </small>
                </Col>
            </Row>
            <Row>
                <Col className='col-thankyou'>
                    <div className='glider-font-h2-fg'>
                        <p>{checkStatus === CONFIRMATION_STATUS.SUCCESS && "Thank you for using Glider !"}</p>
                    </div>
                </Col>
            </Row>
        </Container>

    );

}



