import FareFamilyHelper from '../../src/utils/fare-family-helper';
var assert = require('assert');

const sample = {
    "pricePlans": {
        "RXT7EMIQC6-Basic": {
            "name": "Basic",
            "amenities": ["Checked bags for a fee", "No flight changes"],
            "checkedBaggages": {"quantity": 0},
            "pricePlanId": "RXT7EMIQC6-Basic"
        },
        "JJU2G5KVXN-Standard": {
            "name": "Standard",
            "amenities": ["1st checked bag free", "Changes for a fee", "Up to 50% Aeroplan Miles"],
            "checkedBaggages": {"quantity": 1},
            "pricePlanId": "JJU2G5KVXN-Standard"
        },
        "HSEOUVCLW2-Flex": {
            "name": "Flex",
            "amenities": ["1st checked bag free", "Changes for a discounted fee", "100% Aeroplan Miles", "Free standard seat selection"],
            "checkedBaggages": {"quantity": 1},
            "pricePlanId": "HSEOUVCLW2-Flex"
        },
        "H68WNDKGTP-Latitude": {
            "name": "Latitude",
            "amenities": ["1st checked bag free", "Free changes and cancellations", "125% Aeroplan Miles", "Free extra legroom and standard seat selection", "Free same-day standby", "Priority check-in, baggage and boarding"],
            "checkedBaggages": {"quantity": 1},
            "pricePlanId": "H68WNDKGTP-Latitude"
        },
        "HLVAYZDZ46-PremiumEconomylowest": {
            "name": "Premium Economy (lowest)",
            "amenities": ["2 checked bags free", "Dedicated cabin, larger seat, more legroom", "Premium meal service", "Priority check-in, baggage and boarding", "125% Aeroplan Miles"],
            "checkedBaggages": {"quantity": 2},
            "pricePlanId": "HLVAYZDZ46-PremiumEconomylowest"
        },
        "YQ80NLKQO5-PremiumEconomyflexible": {
            "name": "Premium Economy (flexible)",
            "amenities": ["2 checked bags free", "Dedicated cabin, larger seat, more legroom", "Premium meal service", "Priority check-in, baggage and boarding", "125% Aeroplan Miles", "Free changes, cancellations and standby"],
            "checkedBaggages": {"quantity": 2},
            "pricePlanId": "YQ80NLKQO5-PremiumEconomyflexible"
        },
        "YTIRCE3JL9-BusinessClasslowest": {
            "name": "Business Class (lowest)",
            "amenities": ["2 checked bags free", "Maple Leaf Lounge access", "Exclusive cabin with fully lie-flat seats", "Inspired cuisine, selected wines and spirits", "Priority check-in, security, baggage and boarding", "150% Aeroplan Miles"],
            "checkedBaggages": {"quantity": 2},
            "pricePlanId": "YTIRCE3JL9-BusinessClasslowest"
        },
        "QM2CAQP4ZM-BusinessClassflexible": {
            "name": "Business Class (flexible)",
            "amenities": ["2 checked bags free", "Maple Leaf Lounge access", "Exclusive cabin with fully lie-flat seats", "Inspired cuisine, selected wines and spirits", "Priority check-in, security, baggage and boarding", "150% Aeroplan Miles", "Free changes, cancellations and standby"],
            "checkedBaggages": {"quantity": 2},
            "pricePlanId": "QM2CAQP4ZM-BusinessClassflexible"
        }
    },
    "itineraries": [{
        "itinId": "CVCWVO8WEP-OD142",
        "segments": [{
            "operator": {"operatorType": "airline", "iataCode": "AC", "flightNumber": "AC0807"},
            "origin": {"locationType": "airport", "iataCode": "CDG"},
            "destination": {"locationType": "airport", "iataCode": "YVR"},
            "departureTime": "2020-06-24T10:30:00.000Z",
            "arrivalTime": "2020-06-24T20:40:00.000Z",
            "segmentId": "OORAZKMSY9-SEG283"
        }]
    }, {
        "itinId": "U472IAXG82-OD1",
        "segments": [{
            "operator": {"operatorType": "airline", "iataCode": "AC", "flightNumber": "AC0392"},
            "origin": {"locationType": "airport", "iataCode": "YVR"},
            "destination": {"locationType": "airport", "iataCode": "YUL"},
            "departureTime": "2020-06-17T07:05:00.000Z",
            "arrivalTime": "2020-06-17T11:59:00.000Z",
            "segmentId": "B6JRJ7TLAZ-SEG1"
        }, {
            "operator": {"operatorType": "airline", "iataCode": "AC", "flightNumber": "AC0884"},
            "origin": {"locationType": "airport", "iataCode": "YUL"},
            "destination": {"locationType": "airport", "iataCode": "CDG"},
            "departureTime": "2020-06-17T21:50:00.000Z",
            "arrivalTime": "2020-06-18T04:30:00.000Z",
            "segmentId": "HO3URP8LS8-SEG2"
        }]
    }],
    "offers": {
        "26192dd9-1357-4363-aea1-281646f2507c,7f4d2a46-32a1-4865-ba47-516c56e31e11": {
            "price": {
                "currency": "CAD",
                "public": "906.72",
                "taxes": "111.74"
            },
            "offerId": "26192dd9-1357-4363-aea1-281646f2507c,7f4d2a46-32a1-4865-ba47-516c56e31e11",
            "itinToPlanMap": {"CVCWVO8WEP-OD142": "RXT7EMIQC6-Basic", "U472IAXG82-OD1": "JJU2G5KVXN-Standard"},
            "planToItinMap": {"RXT7EMIQC6-Basic": "CVCWVO8WEP-OD142", "JJU2G5KVXN-Standard": "U472IAXG82-OD1"}
        },
        "f242cad9-97d4-46e2-bec4-d26508f47ea8,7f4d2a46-32a1-4865-ba47-516c56e31e11": {
            "price": {
                "currency": "CAD",
                "public": "1403.20",
                "taxes": "111.74"
            },
            "offerId": "f242cad9-97d4-46e2-bec4-d26508f47ea8,7f4d2a46-32a1-4865-ba47-516c56e31e11",
            "itinToPlanMap": {"CVCWVO8WEP-OD142": "RXT7EMIQC6-Basic", "U472IAXG82-OD1": "HSEOUVCLW2-Flex"},
            "planToItinMap": {"RXT7EMIQC6-Basic": "CVCWVO8WEP-OD142", "HSEOUVCLW2-Flex": "U472IAXG82-OD1"}
        },
        "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,7f4d2a46-32a1-4865-ba47-516c56e31e11": {
            "price": {
                "currency": "CAD",
                "public": "2266.71",
                "taxes": "111.74"
            },
            "offerId": "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,7f4d2a46-32a1-4865-ba47-516c56e31e11",
            "itinToPlanMap": {"CVCWVO8WEP-OD142": "RXT7EMIQC6-Basic", "U472IAXG82-OD1": "H68WNDKGTP-Latitude"},
            "planToItinMap": {"RXT7EMIQC6-Basic": "CVCWVO8WEP-OD142", "H68WNDKGTP-Latitude": "U472IAXG82-OD1"}
        },
        "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,7f4d2a46-32a1-4865-ba47-516c56e31e11": {
            "price": {
                "currency": "CAD",
                "public": "1691.71",
                "taxes": "111.74"
            },
            "offerId": "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,7f4d2a46-32a1-4865-ba47-516c56e31e11",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "RXT7EMIQC6-Basic",
                "U472IAXG82-OD1": "HLVAYZDZ46-PremiumEconomylowest"
            },
            "planToItinMap": {
                "RXT7EMIQC6-Basic": "CVCWVO8WEP-OD142",
                "HLVAYZDZ46-PremiumEconomylowest": "U472IAXG82-OD1"
            }
        },
        "435c01e6-1a47-47d5-8b75-eb6a105db4ff,7f4d2a46-32a1-4865-ba47-516c56e31e11": {
            "price": {
                "currency": "CAD",
                "public": "2441.71",
                "taxes": "111.74"
            },
            "offerId": "435c01e6-1a47-47d5-8b75-eb6a105db4ff,7f4d2a46-32a1-4865-ba47-516c56e31e11",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "RXT7EMIQC6-Basic",
                "U472IAXG82-OD1": "YQ80NLKQO5-PremiumEconomyflexible"
            },
            "planToItinMap": {
                "RXT7EMIQC6-Basic": "CVCWVO8WEP-OD142",
                "YQ80NLKQO5-PremiumEconomyflexible": "U472IAXG82-OD1"
            }
        },
        "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,7f4d2a46-32a1-4865-ba47-516c56e31e11": {
            "price": {
                "currency": "CAD",
                "public": "4009.21",
                "taxes": "111.74"
            },
            "offerId": "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,7f4d2a46-32a1-4865-ba47-516c56e31e11",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "RXT7EMIQC6-Basic",
                "U472IAXG82-OD1": "YTIRCE3JL9-BusinessClasslowest"
            },
            "planToItinMap": {
                "RXT7EMIQC6-Basic": "CVCWVO8WEP-OD142",
                "YTIRCE3JL9-BusinessClasslowest": "U472IAXG82-OD1"
            }
        },
        "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,7f4d2a46-32a1-4865-ba47-516c56e31e11": {
            "price": {
                "currency": "CAD",
                "public": "7453.21",
                "taxes": "111.74"
            },
            "offerId": "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,7f4d2a46-32a1-4865-ba47-516c56e31e11",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "RXT7EMIQC6-Basic",
                "U472IAXG82-OD1": "QM2CAQP4ZM-BusinessClassflexible"
            },
            "planToItinMap": {
                "RXT7EMIQC6-Basic": "CVCWVO8WEP-OD142",
                "QM2CAQP4ZM-BusinessClassflexible": "U472IAXG82-OD1"
            }
        },
        "bb5d7802-f795-4877-bd06-1620b0716d23,4046f592-6c15-44f4-8461-21f8cc95b688": {
            "price": {
                "currency": "CAD",
                "public": "906.72",
                "taxes": "111.74"
            },
            "offerId": "bb5d7802-f795-4877-bd06-1620b0716d23,4046f592-6c15-44f4-8461-21f8cc95b688",
            "itinToPlanMap": {"CVCWVO8WEP-OD142": "JJU2G5KVXN-Standard", "U472IAXG82-OD1": "RXT7EMIQC6-Basic"},
            "planToItinMap": {"JJU2G5KVXN-Standard": "CVCWVO8WEP-OD142", "RXT7EMIQC6-Basic": "U472IAXG82-OD1"}
        },
        "f242cad9-97d4-46e2-bec4-d26508f47ea8,4046f592-6c15-44f4-8461-21f8cc95b688": {
            "price": {
                "currency": "CAD",
                "public": "1463.20",
                "taxes": "111.74"
            },
            "offerId": "f242cad9-97d4-46e2-bec4-d26508f47ea8,4046f592-6c15-44f4-8461-21f8cc95b688",
            "itinToPlanMap": {"CVCWVO8WEP-OD142": "JJU2G5KVXN-Standard", "U472IAXG82-OD1": "HSEOUVCLW2-Flex"},
            "planToItinMap": {"JJU2G5KVXN-Standard": "CVCWVO8WEP-OD142", "HSEOUVCLW2-Flex": "U472IAXG82-OD1"}
        },
        "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,4046f592-6c15-44f4-8461-21f8cc95b688": {
            "price": {
                "currency": "CAD",
                "public": "2326.71",
                "taxes": "111.74"
            },
            "offerId": "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,4046f592-6c15-44f4-8461-21f8cc95b688",
            "itinToPlanMap": {"CVCWVO8WEP-OD142": "JJU2G5KVXN-Standard", "U472IAXG82-OD1": "H68WNDKGTP-Latitude"},
            "planToItinMap": {"JJU2G5KVXN-Standard": "CVCWVO8WEP-OD142", "H68WNDKGTP-Latitude": "U472IAXG82-OD1"}
        },
        "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,4046f592-6c15-44f4-8461-21f8cc95b688": {
            "price": {
                "currency": "CAD",
                "public": "1751.71",
                "taxes": "111.74"
            },
            "offerId": "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,4046f592-6c15-44f4-8461-21f8cc95b688",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "JJU2G5KVXN-Standard",
                "U472IAXG82-OD1": "HLVAYZDZ46-PremiumEconomylowest"
            },
            "planToItinMap": {
                "JJU2G5KVXN-Standard": "CVCWVO8WEP-OD142",
                "HLVAYZDZ46-PremiumEconomylowest": "U472IAXG82-OD1"
            }
        },
        "435c01e6-1a47-47d5-8b75-eb6a105db4ff,4046f592-6c15-44f4-8461-21f8cc95b688": {
            "price": {
                "currency": "CAD",
                "public": "2501.71",
                "taxes": "111.74"
            },
            "offerId": "435c01e6-1a47-47d5-8b75-eb6a105db4ff,4046f592-6c15-44f4-8461-21f8cc95b688",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "JJU2G5KVXN-Standard",
                "U472IAXG82-OD1": "YQ80NLKQO5-PremiumEconomyflexible"
            },
            "planToItinMap": {
                "JJU2G5KVXN-Standard": "CVCWVO8WEP-OD142",
                "YQ80NLKQO5-PremiumEconomyflexible": "U472IAXG82-OD1"
            }
        },
        "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,4046f592-6c15-44f4-8461-21f8cc95b688": {
            "price": {
                "currency": "CAD",
                "public": "4069.21",
                "taxes": "111.74"
            },
            "offerId": "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,4046f592-6c15-44f4-8461-21f8cc95b688",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "JJU2G5KVXN-Standard",
                "U472IAXG82-OD1": "YTIRCE3JL9-BusinessClasslowest"
            },
            "planToItinMap": {
                "JJU2G5KVXN-Standard": "CVCWVO8WEP-OD142",
                "YTIRCE3JL9-BusinessClasslowest": "U472IAXG82-OD1"
            }
        },
        "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,4046f592-6c15-44f4-8461-21f8cc95b688": {
            "price": {
                "currency": "CAD",
                "public": "7513.21",
                "taxes": "111.74"
            },
            "offerId": "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,4046f592-6c15-44f4-8461-21f8cc95b688",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "JJU2G5KVXN-Standard",
                "U472IAXG82-OD1": "QM2CAQP4ZM-BusinessClassflexible"
            },
            "planToItinMap": {
                "JJU2G5KVXN-Standard": "CVCWVO8WEP-OD142",
                "QM2CAQP4ZM-BusinessClassflexible": "U472IAXG82-OD1"
            }
        },
        "bb5d7802-f795-4877-bd06-1620b0716d23,627edbee-5ef1-47a0-8859-3ad68684378f": {
            "price": {
                "currency": "CAD",
                "public": "1323.71",
                "taxes": "111.74"
            },
            "offerId": "bb5d7802-f795-4877-bd06-1620b0716d23,627edbee-5ef1-47a0-8859-3ad68684378f",
            "itinToPlanMap": {"CVCWVO8WEP-OD142": "HSEOUVCLW2-Flex", "U472IAXG82-OD1": "RXT7EMIQC6-Basic"},
            "planToItinMap": {"HSEOUVCLW2-Flex": "CVCWVO8WEP-OD142", "RXT7EMIQC6-Basic": "U472IAXG82-OD1"}
        },
        "26192dd9-1357-4363-aea1-281646f2507c,627edbee-5ef1-47a0-8859-3ad68684378f": {
            "price": {
                "currency": "CAD",
                "public": "1383.71",
                "taxes": "111.74"
            },
            "offerId": "26192dd9-1357-4363-aea1-281646f2507c,627edbee-5ef1-47a0-8859-3ad68684378f",
            "itinToPlanMap": {"CVCWVO8WEP-OD142": "HSEOUVCLW2-Flex", "U472IAXG82-OD1": "JJU2G5KVXN-Standard"},
            "planToItinMap": {"HSEOUVCLW2-Flex": "CVCWVO8WEP-OD142", "JJU2G5KVXN-Standard": "U472IAXG82-OD1"}
        },
        "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,627edbee-5ef1-47a0-8859-3ad68684378f": {
            "price": {
                "currency": "CAD",
                "public": "2743.70",
                "taxes": "111.74"
            },
            "offerId": "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,627edbee-5ef1-47a0-8859-3ad68684378f",
            "itinToPlanMap": {"CVCWVO8WEP-OD142": "HSEOUVCLW2-Flex", "U472IAXG82-OD1": "H68WNDKGTP-Latitude"},
            "planToItinMap": {"HSEOUVCLW2-Flex": "CVCWVO8WEP-OD142", "H68WNDKGTP-Latitude": "U472IAXG82-OD1"}
        },
        "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,627edbee-5ef1-47a0-8859-3ad68684378f": {
            "price": {
                "currency": "CAD",
                "public": "2168.70",
                "taxes": "111.74"
            },
            "offerId": "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,627edbee-5ef1-47a0-8859-3ad68684378f",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "HSEOUVCLW2-Flex",
                "U472IAXG82-OD1": "HLVAYZDZ46-PremiumEconomylowest"
            },
            "planToItinMap": {
                "HSEOUVCLW2-Flex": "CVCWVO8WEP-OD142",
                "HLVAYZDZ46-PremiumEconomylowest": "U472IAXG82-OD1"
            }
        },
        "435c01e6-1a47-47d5-8b75-eb6a105db4ff,627edbee-5ef1-47a0-8859-3ad68684378f": {
            "price": {
                "currency": "CAD",
                "public": "2918.70",
                "taxes": "111.74"
            },
            "offerId": "435c01e6-1a47-47d5-8b75-eb6a105db4ff,627edbee-5ef1-47a0-8859-3ad68684378f",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "HSEOUVCLW2-Flex",
                "U472IAXG82-OD1": "YQ80NLKQO5-PremiumEconomyflexible"
            },
            "planToItinMap": {
                "HSEOUVCLW2-Flex": "CVCWVO8WEP-OD142",
                "YQ80NLKQO5-PremiumEconomyflexible": "U472IAXG82-OD1"
            }
        },
        "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,627edbee-5ef1-47a0-8859-3ad68684378f": {
            "price": {
                "currency": "CAD",
                "public": "4486.20",
                "taxes": "111.74"
            },
            "offerId": "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,627edbee-5ef1-47a0-8859-3ad68684378f",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "HSEOUVCLW2-Flex",
                "U472IAXG82-OD1": "YTIRCE3JL9-BusinessClasslowest"
            },
            "planToItinMap": {"HSEOUVCLW2-Flex": "CVCWVO8WEP-OD142", "YTIRCE3JL9-BusinessClasslowest": "U472IAXG82-OD1"}
        },
        "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,627edbee-5ef1-47a0-8859-3ad68684378f": {
            "price": {
                "currency": "CAD",
                "public": "7930.20",
                "taxes": "111.74"
            },
            "offerId": "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,627edbee-5ef1-47a0-8859-3ad68684378f",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "HSEOUVCLW2-Flex",
                "U472IAXG82-OD1": "QM2CAQP4ZM-BusinessClassflexible"
            },
            "planToItinMap": {
                "HSEOUVCLW2-Flex": "CVCWVO8WEP-OD142",
                "QM2CAQP4ZM-BusinessClassflexible": "U472IAXG82-OD1"
            }
        },
        "bb5d7802-f795-4877-bd06-1620b0716d23,372159ff-eec9-4cd2-a765-cbde4b0904bd": {
            "price": {
                "currency": "CAD",
                "public": "2166.71",
                "taxes": "111.74"
            },
            "offerId": "bb5d7802-f795-4877-bd06-1620b0716d23,372159ff-eec9-4cd2-a765-cbde4b0904bd",
            "itinToPlanMap": {"CVCWVO8WEP-OD142": "H68WNDKGTP-Latitude", "U472IAXG82-OD1": "RXT7EMIQC6-Basic"},
            "planToItinMap": {"H68WNDKGTP-Latitude": "CVCWVO8WEP-OD142", "RXT7EMIQC6-Basic": "U472IAXG82-OD1"}
        },
        "26192dd9-1357-4363-aea1-281646f2507c,372159ff-eec9-4cd2-a765-cbde4b0904bd": {
            "price": {
                "currency": "CAD",
                "public": "2226.71",
                "taxes": "111.74"
            },
            "offerId": "26192dd9-1357-4363-aea1-281646f2507c,372159ff-eec9-4cd2-a765-cbde4b0904bd",
            "itinToPlanMap": {"CVCWVO8WEP-OD142": "H68WNDKGTP-Latitude", "U472IAXG82-OD1": "JJU2G5KVXN-Standard"},
            "planToItinMap": {"H68WNDKGTP-Latitude": "CVCWVO8WEP-OD142", "JJU2G5KVXN-Standard": "U472IAXG82-OD1"}
        },
        "f242cad9-97d4-46e2-bec4-d26508f47ea8,372159ff-eec9-4cd2-a765-cbde4b0904bd": {
            "price": {
                "currency": "CAD",
                "public": "2723.19",
                "taxes": "111.74"
            },
            "offerId": "f242cad9-97d4-46e2-bec4-d26508f47ea8,372159ff-eec9-4cd2-a765-cbde4b0904bd",
            "itinToPlanMap": {"CVCWVO8WEP-OD142": "H68WNDKGTP-Latitude", "U472IAXG82-OD1": "HSEOUVCLW2-Flex"},
            "planToItinMap": {"H68WNDKGTP-Latitude": "CVCWVO8WEP-OD142", "HSEOUVCLW2-Flex": "U472IAXG82-OD1"}
        },
        "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,372159ff-eec9-4cd2-a765-cbde4b0904bd": {
            "price": {
                "currency": "CAD",
                "public": "3011.70",
                "taxes": "111.74"
            },
            "offerId": "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,372159ff-eec9-4cd2-a765-cbde4b0904bd",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "H68WNDKGTP-Latitude",
                "U472IAXG82-OD1": "HLVAYZDZ46-PremiumEconomylowest"
            },
            "planToItinMap": {
                "H68WNDKGTP-Latitude": "CVCWVO8WEP-OD142",
                "HLVAYZDZ46-PremiumEconomylowest": "U472IAXG82-OD1"
            }
        },
        "435c01e6-1a47-47d5-8b75-eb6a105db4ff,372159ff-eec9-4cd2-a765-cbde4b0904bd": {
            "price": {
                "currency": "CAD",
                "public": "3761.70",
                "taxes": "111.74"
            },
            "offerId": "435c01e6-1a47-47d5-8b75-eb6a105db4ff,372159ff-eec9-4cd2-a765-cbde4b0904bd",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "H68WNDKGTP-Latitude",
                "U472IAXG82-OD1": "YQ80NLKQO5-PremiumEconomyflexible"
            },
            "planToItinMap": {
                "H68WNDKGTP-Latitude": "CVCWVO8WEP-OD142",
                "YQ80NLKQO5-PremiumEconomyflexible": "U472IAXG82-OD1"
            }
        },
        "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,372159ff-eec9-4cd2-a765-cbde4b0904bd": {
            "price": {
                "currency": "CAD",
                "public": "5329.20",
                "taxes": "111.74"
            },
            "offerId": "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,372159ff-eec9-4cd2-a765-cbde4b0904bd",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "H68WNDKGTP-Latitude",
                "U472IAXG82-OD1": "YTIRCE3JL9-BusinessClasslowest"
            },
            "planToItinMap": {
                "H68WNDKGTP-Latitude": "CVCWVO8WEP-OD142",
                "YTIRCE3JL9-BusinessClasslowest": "U472IAXG82-OD1"
            }
        },
        "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,372159ff-eec9-4cd2-a765-cbde4b0904bd": {
            "price": {
                "currency": "CAD",
                "public": "8773.20",
                "taxes": "111.74"
            },
            "offerId": "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,372159ff-eec9-4cd2-a765-cbde4b0904bd",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "H68WNDKGTP-Latitude",
                "U472IAXG82-OD1": "QM2CAQP4ZM-BusinessClassflexible"
            },
            "planToItinMap": {
                "H68WNDKGTP-Latitude": "CVCWVO8WEP-OD142",
                "QM2CAQP4ZM-BusinessClassflexible": "U472IAXG82-OD1"
            }
        },
        "bb5d7802-f795-4877-bd06-1620b0716d23,fb872ec3-239d-4dbb-a440-04ed71a7a1d9": {
            "price": {
                "currency": "CAD",
                "public": "1591.71",
                "taxes": "111.74"
            },
            "offerId": "bb5d7802-f795-4877-bd06-1620b0716d23,fb872ec3-239d-4dbb-a440-04ed71a7a1d9",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "HLVAYZDZ46-PremiumEconomylowest",
                "U472IAXG82-OD1": "RXT7EMIQC6-Basic"
            },
            "planToItinMap": {
                "HLVAYZDZ46-PremiumEconomylowest": "CVCWVO8WEP-OD142",
                "RXT7EMIQC6-Basic": "U472IAXG82-OD1"
            }
        },
        "26192dd9-1357-4363-aea1-281646f2507c,fb872ec3-239d-4dbb-a440-04ed71a7a1d9": {
            "price": {
                "currency": "CAD",
                "public": "1651.71",
                "taxes": "111.74"
            },
            "offerId": "26192dd9-1357-4363-aea1-281646f2507c,fb872ec3-239d-4dbb-a440-04ed71a7a1d9",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "HLVAYZDZ46-PremiumEconomylowest",
                "U472IAXG82-OD1": "JJU2G5KVXN-Standard"
            },
            "planToItinMap": {
                "HLVAYZDZ46-PremiumEconomylowest": "CVCWVO8WEP-OD142",
                "JJU2G5KVXN-Standard": "U472IAXG82-OD1"
            }
        },
        "f242cad9-97d4-46e2-bec4-d26508f47ea8,fb872ec3-239d-4dbb-a440-04ed71a7a1d9": {
            "price": {
                "currency": "CAD",
                "public": "2148.19",
                "taxes": "111.74"
            },
            "offerId": "f242cad9-97d4-46e2-bec4-d26508f47ea8,fb872ec3-239d-4dbb-a440-04ed71a7a1d9",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "HLVAYZDZ46-PremiumEconomylowest",
                "U472IAXG82-OD1": "HSEOUVCLW2-Flex"
            },
            "planToItinMap": {
                "HLVAYZDZ46-PremiumEconomylowest": "CVCWVO8WEP-OD142",
                "HSEOUVCLW2-Flex": "U472IAXG82-OD1"
            }
        },
        "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,fb872ec3-239d-4dbb-a440-04ed71a7a1d9": {
            "price": {
                "currency": "CAD",
                "public": "3011.70",
                "taxes": "111.74"
            },
            "offerId": "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,fb872ec3-239d-4dbb-a440-04ed71a7a1d9",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "HLVAYZDZ46-PremiumEconomylowest",
                "U472IAXG82-OD1": "H68WNDKGTP-Latitude"
            },
            "planToItinMap": {
                "HLVAYZDZ46-PremiumEconomylowest": "CVCWVO8WEP-OD142",
                "H68WNDKGTP-Latitude": "U472IAXG82-OD1"
            }
        },
        "435c01e6-1a47-47d5-8b75-eb6a105db4ff,fb872ec3-239d-4dbb-a440-04ed71a7a1d9": {
            "price": {
                "currency": "CAD",
                "public": "3186.70",
                "taxes": "111.74"
            },
            "offerId": "435c01e6-1a47-47d5-8b75-eb6a105db4ff,fb872ec3-239d-4dbb-a440-04ed71a7a1d9",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "HLVAYZDZ46-PremiumEconomylowest",
                "U472IAXG82-OD1": "YQ80NLKQO5-PremiumEconomyflexible"
            },
            "planToItinMap": {
                "HLVAYZDZ46-PremiumEconomylowest": "CVCWVO8WEP-OD142",
                "YQ80NLKQO5-PremiumEconomyflexible": "U472IAXG82-OD1"
            }
        },
        "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,fb872ec3-239d-4dbb-a440-04ed71a7a1d9": {
            "price": {
                "currency": "CAD",
                "public": "4754.20",
                "taxes": "111.74"
            },
            "offerId": "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,fb872ec3-239d-4dbb-a440-04ed71a7a1d9",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "HLVAYZDZ46-PremiumEconomylowest",
                "U472IAXG82-OD1": "YTIRCE3JL9-BusinessClasslowest"
            },
            "planToItinMap": {
                "HLVAYZDZ46-PremiumEconomylowest": "CVCWVO8WEP-OD142",
                "YTIRCE3JL9-BusinessClasslowest": "U472IAXG82-OD1"
            }
        },
        "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,fb872ec3-239d-4dbb-a440-04ed71a7a1d9": {
            "price": {
                "currency": "CAD",
                "public": "8198.20",
                "taxes": "111.74"
            },
            "offerId": "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,fb872ec3-239d-4dbb-a440-04ed71a7a1d9",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "HLVAYZDZ46-PremiumEconomylowest",
                "U472IAXG82-OD1": "QM2CAQP4ZM-BusinessClassflexible"
            },
            "planToItinMap": {
                "HLVAYZDZ46-PremiumEconomylowest": "CVCWVO8WEP-OD142",
                "QM2CAQP4ZM-BusinessClassflexible": "U472IAXG82-OD1"
            }
        },
        "bb5d7802-f795-4877-bd06-1620b0716d23,20aa84ae-31f5-4c57-86ce-9e3660ca825f": {
            "price": {
                "currency": "CAD",
                "public": "2341.71",
                "taxes": "111.74"
            },
            "offerId": "bb5d7802-f795-4877-bd06-1620b0716d23,20aa84ae-31f5-4c57-86ce-9e3660ca825f",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YQ80NLKQO5-PremiumEconomyflexible",
                "U472IAXG82-OD1": "RXT7EMIQC6-Basic"
            },
            "planToItinMap": {
                "YQ80NLKQO5-PremiumEconomyflexible": "CVCWVO8WEP-OD142",
                "RXT7EMIQC6-Basic": "U472IAXG82-OD1"
            }
        },
        "26192dd9-1357-4363-aea1-281646f2507c,20aa84ae-31f5-4c57-86ce-9e3660ca825f": {
            "price": {
                "currency": "CAD",
                "public": "2401.71",
                "taxes": "111.74"
            },
            "offerId": "26192dd9-1357-4363-aea1-281646f2507c,20aa84ae-31f5-4c57-86ce-9e3660ca825f",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YQ80NLKQO5-PremiumEconomyflexible",
                "U472IAXG82-OD1": "JJU2G5KVXN-Standard"
            },
            "planToItinMap": {
                "YQ80NLKQO5-PremiumEconomyflexible": "CVCWVO8WEP-OD142",
                "JJU2G5KVXN-Standard": "U472IAXG82-OD1"
            }
        },
        "f242cad9-97d4-46e2-bec4-d26508f47ea8,20aa84ae-31f5-4c57-86ce-9e3660ca825f": {
            "price": {
                "currency": "CAD",
                "public": "2898.19",
                "taxes": "111.74"
            },
            "offerId": "f242cad9-97d4-46e2-bec4-d26508f47ea8,20aa84ae-31f5-4c57-86ce-9e3660ca825f",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YQ80NLKQO5-PremiumEconomyflexible",
                "U472IAXG82-OD1": "HSEOUVCLW2-Flex"
            },
            "planToItinMap": {
                "YQ80NLKQO5-PremiumEconomyflexible": "CVCWVO8WEP-OD142",
                "HSEOUVCLW2-Flex": "U472IAXG82-OD1"
            }
        },
        "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,20aa84ae-31f5-4c57-86ce-9e3660ca825f": {
            "price": {
                "currency": "CAD",
                "public": "3761.70",
                "taxes": "111.74"
            },
            "offerId": "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,20aa84ae-31f5-4c57-86ce-9e3660ca825f",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YQ80NLKQO5-PremiumEconomyflexible",
                "U472IAXG82-OD1": "H68WNDKGTP-Latitude"
            },
            "planToItinMap": {
                "YQ80NLKQO5-PremiumEconomyflexible": "CVCWVO8WEP-OD142",
                "H68WNDKGTP-Latitude": "U472IAXG82-OD1"
            }
        },
        "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,20aa84ae-31f5-4c57-86ce-9e3660ca825f": {
            "price": {
                "currency": "CAD",
                "public": "3186.70",
                "taxes": "111.74"
            },
            "offerId": "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,20aa84ae-31f5-4c57-86ce-9e3660ca825f",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YQ80NLKQO5-PremiumEconomyflexible",
                "U472IAXG82-OD1": "HLVAYZDZ46-PremiumEconomylowest"
            },
            "planToItinMap": {
                "YQ80NLKQO5-PremiumEconomyflexible": "CVCWVO8WEP-OD142",
                "HLVAYZDZ46-PremiumEconomylowest": "U472IAXG82-OD1"
            }
        },
        "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,20aa84ae-31f5-4c57-86ce-9e3660ca825f": {
            "price": {
                "currency": "CAD",
                "public": "5504.20",
                "taxes": "111.74"
            },
            "offerId": "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,20aa84ae-31f5-4c57-86ce-9e3660ca825f",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YQ80NLKQO5-PremiumEconomyflexible",
                "U472IAXG82-OD1": "YTIRCE3JL9-BusinessClasslowest"
            },
            "planToItinMap": {
                "YQ80NLKQO5-PremiumEconomyflexible": "CVCWVO8WEP-OD142",
                "YTIRCE3JL9-BusinessClasslowest": "U472IAXG82-OD1"
            }
        },
        "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,20aa84ae-31f5-4c57-86ce-9e3660ca825f": {
            "price": {
                "currency": "CAD",
                "public": "8948.20",
                "taxes": "111.74"
            },
            "offerId": "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,20aa84ae-31f5-4c57-86ce-9e3660ca825f",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YQ80NLKQO5-PremiumEconomyflexible",
                "U472IAXG82-OD1": "QM2CAQP4ZM-BusinessClassflexible"
            },
            "planToItinMap": {
                "YQ80NLKQO5-PremiumEconomyflexible": "CVCWVO8WEP-OD142",
                "QM2CAQP4ZM-BusinessClassflexible": "U472IAXG82-OD1"
            }
        },
        "bb5d7802-f795-4877-bd06-1620b0716d23,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489": {
            "price": {
                "currency": "CAD",
                "public": "3993.27",
                "taxes": "195.80"
            },
            "offerId": "bb5d7802-f795-4877-bd06-1620b0716d23,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YTIRCE3JL9-BusinessClasslowest",
                "U472IAXG82-OD1": "RXT7EMIQC6-Basic"
            },
            "planToItinMap": {
                "YTIRCE3JL9-BusinessClasslowest": "CVCWVO8WEP-OD142",
                "RXT7EMIQC6-Basic": "U472IAXG82-OD1"
            }
        },
        "26192dd9-1357-4363-aea1-281646f2507c,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489": {
            "price": {
                "currency": "CAD",
                "public": "4053.27",
                "taxes": "195.80"
            },
            "offerId": "26192dd9-1357-4363-aea1-281646f2507c,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YTIRCE3JL9-BusinessClasslowest",
                "U472IAXG82-OD1": "JJU2G5KVXN-Standard"
            },
            "planToItinMap": {
                "YTIRCE3JL9-BusinessClasslowest": "CVCWVO8WEP-OD142",
                "JJU2G5KVXN-Standard": "U472IAXG82-OD1"
            }
        },
        "f242cad9-97d4-46e2-bec4-d26508f47ea8,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489": {
            "price": {
                "currency": "CAD",
                "public": "4549.75",
                "taxes": "195.80"
            },
            "offerId": "f242cad9-97d4-46e2-bec4-d26508f47ea8,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YTIRCE3JL9-BusinessClasslowest",
                "U472IAXG82-OD1": "HSEOUVCLW2-Flex"
            },
            "planToItinMap": {"YTIRCE3JL9-BusinessClasslowest": "CVCWVO8WEP-OD142", "HSEOUVCLW2-Flex": "U472IAXG82-OD1"}
        },
        "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489": {
            "price": {
                "currency": "CAD",
                "public": "5413.26",
                "taxes": "195.80"
            },
            "offerId": "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YTIRCE3JL9-BusinessClasslowest",
                "U472IAXG82-OD1": "H68WNDKGTP-Latitude"
            },
            "planToItinMap": {
                "YTIRCE3JL9-BusinessClasslowest": "CVCWVO8WEP-OD142",
                "H68WNDKGTP-Latitude": "U472IAXG82-OD1"
            }
        },
        "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489": {
            "price": {
                "currency": "CAD",
                "public": "4838.26",
                "taxes": "195.80"
            },
            "offerId": "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YTIRCE3JL9-BusinessClasslowest",
                "U472IAXG82-OD1": "HLVAYZDZ46-PremiumEconomylowest"
            },
            "planToItinMap": {
                "YTIRCE3JL9-BusinessClasslowest": "CVCWVO8WEP-OD142",
                "HLVAYZDZ46-PremiumEconomylowest": "U472IAXG82-OD1"
            }
        },
        "435c01e6-1a47-47d5-8b75-eb6a105db4ff,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489": {
            "price": {
                "currency": "CAD",
                "public": "5588.26",
                "taxes": "195.80"
            },
            "offerId": "435c01e6-1a47-47d5-8b75-eb6a105db4ff,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YTIRCE3JL9-BusinessClasslowest",
                "U472IAXG82-OD1": "YQ80NLKQO5-PremiumEconomyflexible"
            },
            "planToItinMap": {
                "YTIRCE3JL9-BusinessClasslowest": "CVCWVO8WEP-OD142",
                "YQ80NLKQO5-PremiumEconomyflexible": "U472IAXG82-OD1"
            }
        },
        "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489": {
            "price": {
                "currency": "CAD",
                "public": "10599.76",
                "taxes": "195.80"
            },
            "offerId": "15f4b3fe-c998-40bd-b8e8-feb0c7ff051f,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "YTIRCE3JL9-BusinessClasslowest",
                "U472IAXG82-OD1": "QM2CAQP4ZM-BusinessClassflexible"
            },
            "planToItinMap": {
                "YTIRCE3JL9-BusinessClasslowest": "CVCWVO8WEP-OD142",
                "QM2CAQP4ZM-BusinessClassflexible": "U472IAXG82-OD1"
            }
        },
        "bb5d7802-f795-4877-bd06-1620b0716d23,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00": {
            "price": {
                "currency": "CAD",
                "public": "7437.27",
                "taxes": "195.80"
            },
            "offerId": "bb5d7802-f795-4877-bd06-1620b0716d23,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "QM2CAQP4ZM-BusinessClassflexible",
                "U472IAXG82-OD1": "RXT7EMIQC6-Basic"
            },
            "planToItinMap": {
                "QM2CAQP4ZM-BusinessClassflexible": "CVCWVO8WEP-OD142",
                "RXT7EMIQC6-Basic": "U472IAXG82-OD1"
            }
        },
        "26192dd9-1357-4363-aea1-281646f2507c,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00": {
            "price": {
                "currency": "CAD",
                "public": "7497.27",
                "taxes": "195.80"
            },
            "offerId": "26192dd9-1357-4363-aea1-281646f2507c,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "QM2CAQP4ZM-BusinessClassflexible",
                "U472IAXG82-OD1": "JJU2G5KVXN-Standard"
            },
            "planToItinMap": {
                "QM2CAQP4ZM-BusinessClassflexible": "CVCWVO8WEP-OD142",
                "JJU2G5KVXN-Standard": "U472IAXG82-OD1"
            }
        },
        "f242cad9-97d4-46e2-bec4-d26508f47ea8,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00": {
            "price": {
                "currency": "CAD",
                "public": "7993.75",
                "taxes": "195.80"
            },
            "offerId": "f242cad9-97d4-46e2-bec4-d26508f47ea8,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "QM2CAQP4ZM-BusinessClassflexible",
                "U472IAXG82-OD1": "HSEOUVCLW2-Flex"
            },
            "planToItinMap": {
                "QM2CAQP4ZM-BusinessClassflexible": "CVCWVO8WEP-OD142",
                "HSEOUVCLW2-Flex": "U472IAXG82-OD1"
            }
        },
        "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00": {
            "price": {
                "currency": "CAD",
                "public": "8857.26",
                "taxes": "195.80"
            },
            "offerId": "5d7d826d-47b9-4002-87e0-c2f3b47cd10a,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "QM2CAQP4ZM-BusinessClassflexible",
                "U472IAXG82-OD1": "H68WNDKGTP-Latitude"
            },
            "planToItinMap": {
                "QM2CAQP4ZM-BusinessClassflexible": "CVCWVO8WEP-OD142",
                "H68WNDKGTP-Latitude": "U472IAXG82-OD1"
            }
        },
        "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00": {
            "price": {
                "currency": "CAD",
                "public": "8282.26",
                "taxes": "195.80"
            },
            "offerId": "1ac83b25-4bf2-4a5b-8d25-94614f8e54e8,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "QM2CAQP4ZM-BusinessClassflexible",
                "U472IAXG82-OD1": "HLVAYZDZ46-PremiumEconomylowest"
            },
            "planToItinMap": {
                "QM2CAQP4ZM-BusinessClassflexible": "CVCWVO8WEP-OD142",
                "HLVAYZDZ46-PremiumEconomylowest": "U472IAXG82-OD1"
            }
        },
        "435c01e6-1a47-47d5-8b75-eb6a105db4ff,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00": {
            "price": {
                "currency": "CAD",
                "public": "9032.26",
                "taxes": "195.80"
            },
            "offerId": "435c01e6-1a47-47d5-8b75-eb6a105db4ff,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "QM2CAQP4ZM-BusinessClassflexible",
                "U472IAXG82-OD1": "YQ80NLKQO5-PremiumEconomyflexible"
            },
            "planToItinMap": {
                "QM2CAQP4ZM-BusinessClassflexible": "CVCWVO8WEP-OD142",
                "YQ80NLKQO5-PremiumEconomyflexible": "U472IAXG82-OD1"
            }
        },
        "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00": {
            "price": {
                "currency": "CAD",
                "public": "10599.76",
                "taxes": "195.80"
            },
            "offerId": "a6c7c1a6-56ba-41d1-92fe-18c325abad8a,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00",
            "itinToPlanMap": {
                "CVCWVO8WEP-OD142": "QM2CAQP4ZM-BusinessClassflexible",
                "U472IAXG82-OD1": "YTIRCE3JL9-BusinessClasslowest"
            },
            "planToItinMap": {
                "QM2CAQP4ZM-BusinessClassflexible": "CVCWVO8WEP-OD142",
                "YTIRCE3JL9-BusinessClasslowest": "U472IAXG82-OD1"
            }
        }
    }
}



const fareFamilyHelper = new FareFamilyHelper(sample);

describe('FareFamilyHelper', function () {
    describe('#getItineraryPricePlansInAscendingOrder()', function () {
        it('should return list of price plan IDs available for itinID - list should be in ascending order (cheapest plan first)', function () {
            let pricePlanIds = fareFamilyHelper.getItineraryPricePlansInAscendingOrder('CVCWVO8WEP-OD142')
            console.log("Pricplan",pricePlanIds)
            assert.deepEqual(pricePlanIds,[ 'HSEOUVCLW2-Flex',
                'RXT7EMIQC6-Basic',
                'JJU2G5KVXN-Standard',
                'HLVAYZDZ46-PremiumEconomylowest',
                'H68WNDKGTP-Latitude',
                'YQ80NLKQO5-PremiumEconomyflexible',
                'YTIRCE3JL9-BusinessClasslowest',
                'QM2CAQP4ZM-BusinessClassflexible' ])
        })
        it('should return list of price plans available for itinID with an offset price', function () {
            let itinPricePlanOffsetPrices = fareFamilyHelper.getItineraryPricePlanOffsetPrices('26192dd9-1357-4363-aea1-281646f2507c,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489','CVCWVO8WEP-OD142');
            let expected = { 'RXT7EMIQC6-Basic':
                    { offerId:
                            '26192dd9-1357-4363-aea1-281646f2507c,7f4d2a46-32a1-4865-ba47-516c56e31e11',
                        priceOffset: { public: -3146.55, currency: 'CAD' } },
                'HSEOUVCLW2-Flex':
                    { offerId:
                            '26192dd9-1357-4363-aea1-281646f2507c,627edbee-5ef1-47a0-8859-3ad68684378f',
                        priceOffset: { public: -2669.56, currency: 'CAD' } },
                'H68WNDKGTP-Latitude':
                    { offerId:
                            '26192dd9-1357-4363-aea1-281646f2507c,372159ff-eec9-4cd2-a765-cbde4b0904bd',
                        priceOffset: { public: -1826.56, currency: 'CAD' } },
                'HLVAYZDZ46-PremiumEconomylowest':
                    { offerId:
                            '26192dd9-1357-4363-aea1-281646f2507c,fb872ec3-239d-4dbb-a440-04ed71a7a1d9',
                        priceOffset: { public: -2401.56, currency: 'CAD' } },
                'YQ80NLKQO5-PremiumEconomyflexible':
                    { offerId:
                            '26192dd9-1357-4363-aea1-281646f2507c,20aa84ae-31f5-4c57-86ce-9e3660ca825f',
                        priceOffset: { public: -1651.56, currency: 'CAD' } },
                'QM2CAQP4ZM-BusinessClassflexible':
                    { offerId:
                            '26192dd9-1357-4363-aea1-281646f2507c,1d7f36b5-f9cd-4d13-bf61-d9fe6cb23d00',
                        priceOffset: { public: 3444.0000000000005, currency: 'CAD' } },
                "YTIRCE3JL9-BusinessClasslowest": {
                    "offerId": "26192dd9-1357-4363-aea1-281646f2507c,4e52ba1d-d4d2-4dde-b3cb-56a9952f0489",
                    "priceOffset": {
                        "currency": "CAD",
                        "public": 0
                    }
                }}
            assert.deepEqual(itinPricePlanOffsetPrices,expected)
        })


    })
});
