import React from 'react';

import { useMapBox } from '../hooks/useMapBox';
import '../index.css';


const puntoInicial = {
    lng: 5,
    lat: 4,
    zoom: 2
}

export const MapaPage = () => {

    const { setRef, coords } = useMapBox(puntoInicial);

    return (
        <>
            <div className="info">
                lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
            </div>

            <div
                ref={ setRef }
                className="mapContainer"
            />

        </>
    )
}
