import React, { useEffect } from 'react';

import { useMapBox } from '../hooks/useMapBox';
import '../index.css';


const puntoInicial = {
    lng: 5,
    lat: 4,
    zoom: 2
}

export const MapaPage = () => {

    const { setRef, coords, nuevoMarcador$, movimientoMarcador$ } = useMapBox(puntoInicial);

    useEffect(() => {
        nuevoMarcador$.subscribe( marcador => {
            console.log(marcador);
        });
    }, [nuevoMarcador$]);


    useEffect(() => {
        movimientoMarcador$.subscribe( marcador => {
            console.log(marcador.id);
        });
    }, [movimientoMarcador$]);

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
