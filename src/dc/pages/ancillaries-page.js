import React, {useState} from 'react';
import BookingFlowLayout from "../components/layout/booking-flow-layout"
import AncillariesSelectionContent from "../components/ancillaries/ancillaries-selection-content"
import {BookingFlowBreadcrumb, STEPS} from "./booking-flow-breadcrumb";


export default function DCAncillariesPage() {
    let breadcrumb = <BookingFlowBreadcrumb currentStepId={STEPS.FLIGHT_DETAILS}/>

    return (<BookingFlowLayout breadcrumb={breadcrumb}>
        <AncillariesSelectionContent/>
    </BookingFlowLayout>)
}


